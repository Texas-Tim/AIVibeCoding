#!/bin/bash

# Ultimate Frisbee Game Deployment Script
set -e

STACK_NAME="ultimate-frisbee-game"
REGION="us-east-1"
BUCKET_PREFIX="ultimate-frisbee-game"

echo "🚀 Deploying Ultimate Frisbee Arcade Game to AWS..."

# Check if AWS CLI is configured
if ! aws sts get-caller-identity > /dev/null 2>&1; then
    echo "❌ AWS CLI not configured. Run 'aws configure' first."
    exit 1
fi

# Build the project
echo "📦 Building project..."
cd ..
npm run build

# Deploy CloudFormation stack
echo "☁️ Deploying CloudFormation stack..."
aws cloudformation deploy \
    --template-file deploy/cloudformation.yaml \
    --stack-name $STACK_NAME \
    --parameter-overrides BucketName=$BUCKET_PREFIX \
    --region $REGION \
    --capabilities CAPABILITY_IAM

# Get stack outputs
echo "📋 Getting deployment info..."
BUCKET_NAME=$(aws cloudformation describe-stacks \
    --stack-name $STACK_NAME \
    --region $REGION \
    --query 'Stacks[0].Outputs[?OutputKey==`BucketName`].OutputValue' \
    --output text)

WEBSITE_URL=$(aws cloudformation describe-stacks \
    --stack-name $STACK_NAME \
    --region $REGION \
    --query 'Stacks[0].Outputs[?OutputKey==`WebsiteURL`].OutputValue' \
    --output text)

DISTRIBUTION_ID=$(aws cloudformation describe-stacks \
    --stack-name $STACK_NAME \
    --region $REGION \
    --query 'Stacks[0].Outputs[?OutputKey==`DistributionId`].OutputValue' \
    --output text)

echo "📤 Uploading files to S3..."

# Upload built files
aws s3 sync dist/ s3://$BUCKET_NAME/ \
    --delete \
    --cache-control "public, max-age=31536000" \
    --exclude "*.html"

# Upload HTML with shorter cache
aws s3 sync dist/ s3://$BUCKET_NAME/ \
    --cache-control "public, max-age=0, must-revalidate" \
    --include "*.html"

# Copy assets with proper MIME types
if [ -d "assets" ]; then
    echo "📁 Uploading assets..."
    aws s3 sync assets/ s3://$BUCKET_NAME/assets/ \
        --cache-control "public, max-age=31536000"
fi

# Invalidate CloudFront cache
echo "🔄 Invalidating CloudFront cache..."
aws cloudfront create-invalidation \
    --distribution-id $DISTRIBUTION_ID \
    --paths "/*" > /dev/null

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🌐 Website URL: $WEBSITE_URL"
echo "📦 S3 Bucket: $BUCKET_NAME"
echo "🔗 Distribution ID: $DISTRIBUTION_ID"
echo ""
echo "⏳ CloudFront may take 5-15 minutes to fully propagate globally."
echo "🎮 Your game will be available at: $WEBSITE_URL"