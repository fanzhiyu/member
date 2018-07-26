package com.member.core.bean;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Created by apple on 18/7/24.
 */
@ConfigurationProperties(prefix = "translate")
public class TranslateBean {

    private String url;
    private String appId;
    private String apikey;

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getAppId() {
        return appId;
    }

    public void setAppId(String appId) {
        this.appId = appId;
    }

    public String getApikey() {
        return apikey;
    }

    public void setApikey(String apikey) {
        this.apikey = apikey;
    }
}
