package com.featuretoggle.helper;

import org.springframework.util.ResourceUtils;

import java.io.File;
import java.nio.file.Files;

public class JsonHelper {

    public static final String loadRequest(String filename) throws Exception {
        return loadFile("classpath:json/request/" + filename + ".json");
    }

    public static final String loadResponse(String filename) throws  Exception {
        return loadFile("classpath:json/response/" + filename + ".json");
    }

    private static String loadFile(String filePath) throws Exception {
        File file = ResourceUtils.getFile(filePath);
        return new String(Files.readAllBytes(file.toPath()));
    }
}
