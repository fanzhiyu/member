package com.member.application;

import com.alibaba.druid.pool.DruidDataSource;
import com.easy.core.util.JwtUtil;
import com.easy.core.util.UserUtils;
import com.member.core.bean.TranslateBean;
import com.member.core.config.Config;
import com.member.core.filter.AppFilter;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;

/**
 * Created by apple on 17/12/18.
 */
@Configuration
@ComponentScan(basePackages = {"com.member.*.controller","com.member.*.dao.*",
        "com.member.*.service.*"})
@EnableTransactionManagement
public class AppConfig {

    @Autowired
    private DatasourceBean datasourceBean;

    @Bean(name="dataSource")
    public DataSource dataSource(){
        DruidDataSource dataSource = new DruidDataSource();
        dataSource.setUrl(datasourceBean.getUrl());
        dataSource.setUsername(datasourceBean.getUsername());
        dataSource.setPassword(datasourceBean.getPassword());
        dataSource.setDriverClassName(datasourceBean.getDriver());
        return dataSource;
    }

    @Bean(name="sqlSessionFactoryBean")
    public SqlSessionFactory sqlSessionFactoryBean() throws Exception {
        SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
        sqlSessionFactoryBean.setDataSource(dataSource());
        PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
        sqlSessionFactoryBean.setMapperLocations(resolver.getResources("classpath*:/com/member/**/dao/*.xml"));
        return sqlSessionFactoryBean.getObject();
    }

    @Bean(name="sqlSession")
    public SqlSessionTemplate sqlSession(@Qualifier("sqlSessionFactoryBean") SqlSessionFactory sqlSessionFactory){
        return new SqlSessionTemplate(sqlSessionFactory);
    }

    @Bean
    public DataSourceTransactionManager transactionManager(){
        return new DataSourceTransactionManager(dataSource());
    }

    @Bean
    public JwtUtil jwtUtil(){
        return new JwtUtil();
    }

    @Bean
    public UserUtils userUtils() {
        return new UserUtils();
    }

    @Bean
    public Config config(){
        return new Config();
    }

    @Bean
    public AppFilter easyFilter(){
        return new AppFilter();
    }

    @Bean
    public TranslateBean translateBean(){
        return new TranslateBean();
    }
}
