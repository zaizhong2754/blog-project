package com.zz.config.redis;

import com.alibaba.fastjson2.JSON;
import com.alibaba.fastjson2.JSONReader;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.type.TypeFactory;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.data.redis.serializer.SerializationException;
import com.alibaba.fastjson2.JSONWriter.Feature;
import java.util.AbstractMap.SimpleEntry;

import java.nio.charset.Charset;
import java.util.Map;

public class FastJson2RedisSerializer<T> implements RedisSerializer<T> {

    public static final Charset DEFAULT_CHARSET = Charset.forName("UTF-8");

    private Class<T> clazz;

    public FastJson2RedisSerializer(Class<T> clazz)
    {
        super();
        this.clazz = clazz;
    }

    @Override
    public byte[] serialize(T t) throws SerializationException
    {
        if (t == null) {
            return new byte[0];
        }
        Map.Entry<String, T> entity = new SimpleEntry<>(t.getClass().getName(), t);
        return JSON.toJSONString(entity, Feature.WriteClassName).getBytes(DEFAULT_CHARSET);
    }

    @Override
    public T deserialize(byte[] bytes) throws SerializationException
    {
        if (bytes == null || bytes.length <= 0)
        {
            return null;
        }
        String str = new String(bytes, DEFAULT_CHARSET);
        int index = str.indexOf(":");
        String cls = str.substring(2, index - 1);
        String obj = str.substring(index + 1, str.length() - 1);

        return JSON.parseObject(obj,
                clazz,
                JSONReader.autoTypeFilter(
                        cls
                ),
                JSONReader.Feature.SupportClassForName);
    }


    protected JavaType getJavaType(Class<?> clazz)
    {
        return TypeFactory.defaultInstance().constructType(clazz);
    }

}
