# AWS Deployment Guide

## Prerequisites

1. **AWS CLI installed and configured**:
   ```bash
   aws configure
   ```
   Enter your AWS Access Key ID, Secret Access Key, and preferred region (us-east-1).

2. **Required AWS permissions**:
   - CloudFormation (create/update stacks)
   - S3 (create buckets, upload objects)
   - CloudFront (create distributions, invalidations)

## Quick Deploy

```bash
cd deploy
./deploy.sh
```

## Manual Steps

### 1. Deploy Infrastructure
```bash
aws cloudformation deploy \
    --template-file cloudformation.yaml \
    --stack-name ultimate-frisbee-game \
    --parameter-overrides BucketName=ultimate-frisbee-game \
    --region us-east-1
```

### 2. Build and Upload
```bash
# Build project
npm run build

# Upload to S3 (replace BUCKET_NAME with actual bucket)
aws s3 sync dist/ s3://BUCKET_NAME/ --delete
aws s3 sync assets/ s3://BUCKET_NAME/assets/
```

### 3. Invalidate CloudFront
```bash
aws cloudfront create-invalidation \
    --distribution-id DISTRIBUTION_ID \
    --paths "/*"
```

## What Gets Created

- **S3 Bucket**: Hosts your static website files
- **CloudFront Distribution**: Global CDN for fast loading
- **Bucket Policy**: Public read access for website files

## Costs (Estimated)

- **S3**: ~$0.50/month for storage + requests
- **CloudFront**: ~$1-5/month depending on traffic
- **Total**: ~$2-6/month for typical usage

## Custom Domain (Optional)

To use your own domain:

1. **Get SSL certificate** in AWS Certificate Manager
2. **Update CloudFormation** template with:
   ```yaml
   Aliases: [yourdomain.com]
   ViewerCertificate:
     AcmCertificateArn: arn:aws:acm:...
   ```
3. **Point DNS** to CloudFront distribution

## Cleanup

To delete everything:
```bash
aws cloudformation delete-stack --stack-name ultimate-frisbee-game
```