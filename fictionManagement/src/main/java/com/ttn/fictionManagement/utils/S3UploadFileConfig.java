package com.ttn.fictionManagement.utils;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class S3UploadFileConfig {

    private final String accessKey = "AKIA6ODU4YJE37VDFSBF";
    private final String accessSecret = "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";
    private final String region = "us-east-1";

    @Bean
    protected AmazonS3 generateS3Client() {
        AWSCredentials awsCredentials = new BasicAWSCredentials(accessKey, accessSecret);
        return AmazonS3ClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                .withRegion(region).build();
    }
}
