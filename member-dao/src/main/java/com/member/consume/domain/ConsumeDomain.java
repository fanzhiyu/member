package com.member.consume.domain;

import com.easy.core.annotation.Column;
import com.easy.core.annotation.Table;
import com.member.consume.dto.ConsumeDto;

import java.math.BigDecimal;
import java.util.Date;

@Table(name = "sys_consume")
public class ConsumeDomain extends ConsumeDto{
    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column sys_consume.CONSUME_ID
     *
     * @mbg.generated Thu Jul 19 10:36:00 CST 2018
     */
    @Column(id = "consume_id", increment = true, length = 12, rule = "CS")
    private String consumeId;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column sys_consume.MEMBER_ID
     *
     * @mbg.generated Thu Jul 19 10:36:00 CST 2018
     */
    private String memberId;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column sys_consume.CONSUME_AMOUNT
     *
     * @mbg.generated Thu Jul 19 10:36:00 CST 2018
     */
    private BigDecimal consumeAmount;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column sys_consume.CREATER
     *
     * @mbg.generated Thu Jul 19 10:36:00 CST 2018
     */
    private String creater;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column sys_consume.CREATE_TIME
     *
     * @mbg.generated Thu Jul 19 10:36:00 CST 2018
     */
    private Date createTime;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column sys_consume.UPDATER
     *
     * @mbg.generated Thu Jul 19 10:36:00 CST 2018
     */
    private String updater;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column sys_consume.UPDATE_TIME
     *
     * @mbg.generated Thu Jul 19 10:36:00 CST 2018
     */
    private Date updateTime;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column sys_consume.CONSUME_CONTENT
     *
     * @mbg.generated Thu Jul 19 10:36:00 CST 2018
     */
    private String consumeContent;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column sys_consume.CONSUME_ID
     *
     * @return the value of sys_consume.CONSUME_ID
     *
     * @mbg.generated Thu Jul 19 10:36:00 CST 2018
     */
    public String getConsumeId() {
        return consumeId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column sys_consume.CONSUME_ID
     *
     * @param consumeId the value for sys_consume.CONSUME_ID
     *
     * @mbg.generated Thu Jul 19 10:36:00 CST 2018
     */
    public void setConsumeId(String consumeId) {
        this.consumeId = consumeId == null ? null : consumeId.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column sys_consume.MEMBER_ID
     *
     * @return the value of sys_consume.MEMBER_ID
     *
     * @mbg.generated Thu Jul 19 10:36:00 CST 2018
     */
    public String getMemberId() {
        return memberId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column sys_consume.MEMBER_ID
     *
     * @param memberId the value for sys_consume.MEMBER_ID
     *
     * @mbg.generated Thu Jul 19 10:36:00 CST 2018
     */
    public void setMemberId(String memberId) {
        this.memberId = memberId == null ? null : memberId.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column sys_consume.CONSUME_AMOUNT
     *
     * @return the value of sys_consume.CONSUME_AMOUNT
     *
     * @mbg.generated Thu Jul 19 10:36:00 CST 2018
     */
    public BigDecimal getConsumeAmount() {
        return consumeAmount;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column sys_consume.CONSUME_AMOUNT
     *
     * @param consumeAmount the value for sys_consume.CONSUME_AMOUNT
     *
     * @mbg.generated Thu Jul 19 10:36:00 CST 2018
     */
    public void setConsumeAmount(BigDecimal consumeAmount) {
        this.consumeAmount = consumeAmount;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column sys_consume.CREATER
     *
     * @return the value of sys_consume.CREATER
     *
     * @mbg.generated Thu Jul 19 10:36:00 CST 2018
     */
    public String getCreater() {
        return creater;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column sys_consume.CREATER
     *
     * @param creater the value for sys_consume.CREATER
     *
     * @mbg.generated Thu Jul 19 10:36:00 CST 2018
     */
    public void setCreater(String creater) {
        this.creater = creater == null ? null : creater.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column sys_consume.CREATE_TIME
     *
     * @return the value of sys_consume.CREATE_TIME
     *
     * @mbg.generated Thu Jul 19 10:36:00 CST 2018
     */
    public Date getCreateTime() {
        return createTime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column sys_consume.CREATE_TIME
     *
     * @param createTime the value for sys_consume.CREATE_TIME
     *
     * @mbg.generated Thu Jul 19 10:36:00 CST 2018
     */
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column sys_consume.UPDATER
     *
     * @return the value of sys_consume.UPDATER
     *
     * @mbg.generated Thu Jul 19 10:36:00 CST 2018
     */
    public String getUpdater() {
        return updater;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column sys_consume.UPDATER
     *
     * @param updater the value for sys_consume.UPDATER
     *
     * @mbg.generated Thu Jul 19 10:36:00 CST 2018
     */
    public void setUpdater(String updater) {
        this.updater = updater == null ? null : updater.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column sys_consume.UPDATE_TIME
     *
     * @return the value of sys_consume.UPDATE_TIME
     *
     * @mbg.generated Thu Jul 19 10:36:00 CST 2018
     */
    public Date getUpdateTime() {
        return updateTime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column sys_consume.UPDATE_TIME
     *
     * @param updateTime the value for sys_consume.UPDATE_TIME
     *
     * @mbg.generated Thu Jul 19 10:36:00 CST 2018
     */
    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column sys_consume.CONSUME_CONTENT
     *
     * @return the value of sys_consume.CONSUME_CONTENT
     *
     * @mbg.generated Thu Jul 19 10:36:00 CST 2018
     */
    public String getConsumeContent() {
        return consumeContent;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column sys_consume.CONSUME_CONTENT
     *
     * @param consumeContent the value for sys_consume.CONSUME_CONTENT
     *
     * @mbg.generated Thu Jul 19 10:36:00 CST 2018
     */
    public void setConsumeContent(String consumeContent) {
        this.consumeContent = consumeContent == null ? null : consumeContent.trim();
    }
}