package com.member.translate.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.easy.core.bean.UserBean;
import com.easy.core.exception.MessageException;
import com.easy.core.manager.Manager;
import com.easy.core.util.DateUtils;
import com.easy.core.util.HttpUtils;
import com.easy.core.util.StringUtils;
import com.easy.core.util.UserUtils;
import com.member.consume.dao.ConsumeDao;
import com.member.consume.domain.ConsumeDomain;
import com.member.core.bean.TranslateBean;
import com.member.core.contsant.MemberMessage;
import com.member.member.dao.MemberDao;
import com.member.member.domain.MemberDomain;
import com.member.rule.model.RuleModel;
import com.member.rule.service.RuleService;
import com.member.translate.model.TranslateModel;
import com.member.translate.model.TranslatePager;
import com.member.translate.service.TranslateService;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by apple on 18/7/19.
 */
@Service("translateService")
public class TranslateServiceImpl implements TranslateService{

    @Autowired
    private RuleService ruleService;

    @Autowired
    private MemberDao memberDao;

    @Autowired
    private UserUtils userUtils;

    @Autowired
    private TranslateBean translateBean;

    @Autowired
    private ConsumeDao consumeDao;

    /**
     * 提交
     * @param translateModel
     * @throws MessageException
     */
    @Override
    public String submit(TranslateModel translateModel) throws MessageException {
        UserBean userBean = userUtils.getUser();
        checkContent(translateModel);
        MemberDomain memberDomain = new MemberDomain();
        memberDomain.setMemberId(userBean.getUserCode());
        MemberDomain result = memberDao.findCondition(memberDomain);
        // 获取我的金额
        BigDecimal myAmount = result.getMemberAmount();
        if(myAmount.compareTo(new BigDecimal(0)) == 0){
            throw new MessageException(Manager.getMessage(MemberMessage.MEB1016));
        }
        RuleModel ruleModel = ruleService.searchEnableRule();
        Integer number = Integer.valueOf(ruleModel.getRuleNo());
        Integer textLength = translateModel.getContent().length();
        BigDecimal count = new BigDecimal(textLength).divide(new BigDecimal(number)).setScale(0,BigDecimal.ROUND_UP);
        BigDecimal amount = count.multiply(new BigDecimal(ruleModel.getRuleAmount()));
        if (myAmount.compareTo(amount) < 0){
            throw new MessageException(Manager.getMessage(MemberMessage.MEB1016));
        }
        String resStr = null;
        try {
            Map<String, Object> header = buildHttpHeader();
            String xpar = "appid="+translateBean.getAppId();
            String paramBase64 = new String(Base64.encodeBase64(xpar.getBytes("UTF-8")));
            String Sign = DigestUtils.md5Hex(translateModel.getContent() + paramBase64 + translateBean.getApikey());
            String param = "svc=its&token="+translateBean.getApikey()+"&q="+translateModel.getContent()+"&from=cn&to=en&sign=" + Sign;
            String res = HttpUtils.sendGet(translateBean.getUrl(), param, header);
            if(StringUtils.isNull(res)){
                throw new MessageException(Manager.getMessage(MemberMessage.MEB1018));
            }
            String json = new String(Base64.decodeBase64(res));
            JSONObject jsonObject = JSONObject.parseObject(json);
            JSONObject resJson = JSONObject.parseObject(jsonObject.getString("trans_result"));
            resStr = resJson.getString("dst");
        } catch (UnsupportedEncodingException e) {
            throw new MessageException(Manager.getMessage(MemberMessage.MEB1018));
        }
        BigDecimal totalAmount = myAmount.subtract(amount);
        memberDomain.setMemberAmount(totalAmount);
        memberDao.update(memberDomain);
        ConsumeDomain consumeDomain = new ConsumeDomain();
        consumeDomain.setMemberId(userBean.getUserCode());
        consumeDomain.setConsumeAmount(amount);
        consumeDomain.setConsumeContent(translateModel.getContent());
        consumeDomain.setCreater(userBean.getUserCode());
        consumeDomain.setCreateTime(DateUtils.getSystemDate());
        consumeDomain.setUpdater(userBean.getUserCode());
        consumeDomain.setUpdateTime(DateUtils.getSystemDate());
        consumeDao.insert(consumeDomain);
        return resStr;
    }

    /**
     * 查找翻译历史
     * @param translatePager
     * @return
     * @throws MessageException
     */
    @Override
    public TranslatePager searchTranslatePager(TranslatePager translatePager) throws MessageException {
        UserBean userBean = userUtils.getUser();
        ConsumeDomain consumeDomain = new ConsumeDomain();
        consumeDomain.setPageSize(translatePager.getPageSize());
        consumeDomain.setPageNo(translatePager.getPageNo());
        consumeDomain.setMemberId(userBean.getUserCode());
        consumeDomain.setStartDate(translatePager.getStartDate());
        consumeDomain.setEndDate(translatePager.getEndDate());
        ConsumeDomain result = consumeDao.findPaging(consumeDomain);
        TranslatePager model = null;
        List<TranslatePager> resultList = new ArrayList<>();
        for (ConsumeDomain domain : result.getResultList()){
            model = new TranslatePager();
            model.setConsumeId(domain.getConsumeId());
            model.setConsumeAmount(domain.getConsumeAmount().toString());
            model.setConsumeNum(String.valueOf(domain.getConsumeContent().length()));
            model.setMemberName(domain.getMemberName());
            model.setCreateTime(DateUtils.DateToStringFormat(domain.getCreateTime(),DateUtils.YYYY_MM_DD_HH_MM_SS));
            resultList.add(model);
        }
        translatePager.setResultList(resultList);
        translatePager.setCount(result.getCount());
        return translatePager;
    }

    /**
     * 验证内容是否为空
     * @param translateModel
     * @throws MessageException
     */
    private void checkContent(TranslateModel translateModel) throws MessageException{
        if(StringUtils.isNull(translateModel.getContent())){
            throw new MessageException(Manager.getMessage(MemberMessage.MEB1001,Manager.getMessage(MemberMessage.MEB1017)));
        }
    }

    /**
     * 组装http请求头
     */
    private Map<String, Object> buildHttpHeader() throws UnsupportedEncodingException {
        String xpar = "appid=5b2b6096";
        String paramBase64 = new String(Base64.encodeBase64(xpar.getBytes("UTF-8")));
        Map<String, Object> header = new HashMap<>();
        header.put("X-Par", paramBase64);
        header.put("Ver", "1.0");
        return header;
    }

}
