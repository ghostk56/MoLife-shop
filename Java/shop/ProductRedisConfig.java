package com.tibame.tga105.shop;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericToStringSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
public class ProductRedisConfig {
    @Bean(name = "productRedisTemplate")
    public RedisTemplate<String, byte[]> redisTemplate() {
        RedisStandaloneConfiguration redisConfig = new RedisStandaloneConfiguration("localhost", 6379);
        redisConfig.setDatabase(6);

        LettuceConnectionFactory lettuceConnectionFactory = new LettuceConnectionFactory(redisConfig);

        RedisTemplate<String, byte[]> template = new RedisTemplate<>();
        template.setConnectionFactory(lettuceConnectionFactory);
        template.setKeySerializer(new StringRedisSerializer());
        template.setValueSerializer(new GenericToStringSerializer<>(byte[].class));
        lettuceConnectionFactory.afterPropertiesSet();

        return template;
    }
}
