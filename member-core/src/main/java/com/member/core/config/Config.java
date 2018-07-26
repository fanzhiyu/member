package com.member.core.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Created by apple on 17/10/12.
 */

@ConfigurationProperties(prefix = "config")
public class Config {

    private boolean auth;

    private boolean filter;

    private String filterUrl;

    public boolean isAuth() {
        return auth;
    }

    public void setAuth(boolean auth) {
        this.auth = auth;
    }

    public boolean isFilter() {
        return filter;
    }

    public void setFilter(boolean filter) {
        this.filter = filter;
    }

    public String getFilterUrl() {
        return filterUrl;
    }

    public void setFilterUrl(String filterUrl) {
        this.filterUrl = filterUrl;
    }

}
