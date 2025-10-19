<task name="Setup CDN Optimization">

<task_objective>
Configure CDN for optimal content delivery, caching, and global performance optimization. This workflow takes the CDN provider preference as input, analyzes application traffic patterns and content types, configures CDN settings with optimal caching policies, implements compression and asset optimization, and outputs a fully configured CDN setup with monitoring and security measures.
</task_objective>

<detailed_sequence_steps>
# Setup CDN Optimization - Detailed Sequence of Steps

## 1. CDN Strategy and Provider Selection

1. Analyze application traffic patterns and global user distribution to understand CDN requirements.

2. Evaluate CDN providers based on performance, cost, and features (Cloudflare, AWS CloudFront, Fastly, or as specified in **$ARGUMENTS**).

3. Assess content types and specific caching requirements for static assets, dynamic content, and API responses.

4. Plan CDN architecture and edge location strategy based on user geographic distribution.

5. Define performance and cost optimization goals with specific metrics and targets.

## 2. CDN Configuration and Setup

1. Configure CDN with optimal settings for your content types using provider-specific configuration tools.

2. Set up origin servers and failover configurations to ensure high availability.

3. Configure SSL/TLS certificates and security settings for secure content delivery.

4. Implement custom domain and DNS configuration for seamless integration.

5. Set up monitoring and analytics tracking to measure CDN performance.

## 3. Static Asset Optimization

1. Optimize asset build process for CDN delivery with content hashing and versioning.

2. Configure content hashing and versioning strategies to enable efficient cache invalidation.

3. Set up asset bundling and code splitting for CDN delivery optimization.

4. Implement responsive image delivery and optimization with multiple formats and sizes.

5. Configure font loading and optimization strategies including subsetting and preloading.

## 4. Compression and Optimization

1. Configure Gzip and Brotli compression settings at the CDN level for all text-based content.

2. Set up build-time compression for static assets to reduce transfer sizes.

3. Implement dynamic compression for API responses and dynamic content.

4. Configure minification and asset optimization for JavaScript, CSS, and HTML.

5. Set up progressive image formats (WebP, AVIF) with fallbacks for older browsers.

## 5. Cache Headers and Policies

1. Design intelligent caching strategies for different content types based on update frequency.

2. Configure cache control headers and TTL values appropriate for each content type.

3. Implement ETags and conditional request handling for efficient cache validation.

4. Set up cache hierarchy and multi-tier caching strategy across different layers.

5. Configure cache warming and preloading strategies for popular content.

## 6. Image Optimization and Delivery

1. Implement responsive image delivery with multiple formats using srcset and picture elements.

2. Set up automatic image compression and optimization in the build pipeline.

3. Configure lazy loading and progressive image loading for improved page load performance.

4. Implement image resizing and format conversion at the CDN edge.

5. Set up WebP and AVIF format support with automatic fallbacks to JPEG/PNG.

## 7. CDN Purging and Cache Invalidation

1. Implement intelligent cache invalidation strategies that minimize CDN costs.

2. Set up automated purging for deployment pipelines to ensure users receive updated content.

3. Configure selective purging by tags or patterns for granular cache control.

4. Implement real-time cache invalidation for dynamic content updates.

5. Set up cache invalidation monitoring and alerts for failed purge operations.

## 8. Performance Monitoring and Analytics

1. Set up CDN performance monitoring and metrics tracking using provider analytics.

2. Monitor cache hit ratios and bandwidth usage to optimize CDN efficiency.

3. Track response times and error rates across regions to identify performance issues.

4. Implement real user monitoring for CDN performance impact on user experience.

5. Set up alerts for performance degradation and anomalous traffic patterns.

## 9. Security and Access Control

1. Configure CDN security headers and policies including CSP, HSTS, and X-Frame-Options.

2. Implement hotlink protection and referrer validation to prevent content theft.

3. Set up DDoS protection and rate limiting at the CDN edge.

4. Configure geo-blocking and access restrictions based on business requirements.

5. Implement secure token authentication for protected content delivery.

## 10. Cost Optimization and Monitoring

1. Monitor CDN usage and costs across different tiers and regions.

2. Implement cost optimization strategies for bandwidth usage and request patterns.

3. Set up automated cost alerts and budget monitoring to prevent unexpected charges.

4. Analyze usage patterns for tier optimization and right-sizing.

5. Configure cost-effective caching policies that balance performance and cost.

</detailed_sequence_steps>

</task>
