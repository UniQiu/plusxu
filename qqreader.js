/*ziye

本人github地址     https://github.com/ziye12/JavaScript 
转载请备注个名字，谢谢
*/

const jsname = "企鹅读书";
const $ = Env(jsname);

const logs = 0; //0为关闭日志，1为开启
const notifyInterval = 1;
//0为关闭通知，1为所有通知，2为宝箱领取成功通知，3为宝箱每18次通知一次

const dd = 1; //单次任务延迟,默认1秒

const TIME = 30; //单次时长上传限制，默认5分钟

const maxtime = 20; //每日上传时长限制，默认20小时

const wktimess = 1200; //周奖励领取标准，默认1200分钟

const qqreadurlVal = "https://mqqapi.reader.qq.com/mqq/user/init";
let qqreadheaderVal, qqreadtimeurlVal, qqreadtimeheaderVal;
const cookiesArr = [
  {
    qqreadheaderVal: JSON.stringify({
      ywsession: "231ajtrxkxiqa4hxlf9tq6f0x51yq5le",
      Cookie:
        "ywguid=111;ywkey=ywRdaJX3UDkK;platform=ios;channel=mqqmina;mpVersion=0.28.0",
      Connection: "keep-alive",
      "Content-Type": "application/json",
      Accept: "*/*",
      Host: "mqqapi.reader.qq.com",
      "User-Agent": "QQ/8.4.5.626 CFNetwork/1120 Darwin/19.0.0",
      Referer: "https://appservice.qq.com/1110657249/0.28.0/page-frame.html",
      "Accept-Language": "zh-cn",
      "Accept-Encoding": "gzip, deflate, br",
      mpversion: "0.28.0",
    }),
    qqreadtimeurlVal:
      "https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=3001&refer=pages%2Fbook-shelf%2Findex&bid=33543229&readTime=5197&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A5197%2C%22pay_status%22%3A0%7D%7D%5D&sp=%7B%22alg%22%3A%2290.2.1%22%2C%22expid%22%3A32%2C%22exposetime%22%3A%221606331345%22%2C%22logid%22%3A%22605412437109303030%22%2C%22origin%22%3A%220%22%2C%22preitemid%22%3A%22b_33543229%22%2C%22scene%22%3A%22tencent_selected_female%22%2C%22tabtype%22%3A%222%22%2C%22type%22%3A%220%22%2C%22userdegree%22%3A%222%22%7D",
    qqreadtimeheaderVal: JSON.stringify({
      ywsession: "zzjvjyinsn2cp9l6s6vyor8yfba270qc",
      Cookie:
        "ywguid=111;ywkey=ywRdaJX3UDkK;platform=ios;channel=mqqmina;mpVersion=0.28.0;qq_ver=8.4.5;os_ver=iOS 13.2.3;mpos_ver=1.18.0;platform=ios;openid=9B30CCBDB51661025A626639108C1AA0",
      Connection: "keep-alive",
      "Content-Type": "application/json",
      Accept: "*/*",
      Host: "mqqapi.reader.qq.com",
      "User-Agent": "QQ/8.4.5.626 CFNetwork/1120 Darwin/19.0.0",
      Referer: "https://appservice.qq.com/1110657249/0.28.0/page-frame.html",
      "Accept-Language": "zh-cn",
      "Accept-Encoding": "gzip, deflate, br",
      mpversion: "0.28.0",
    }),
  },
  {
    qqreadheaderVal: JSON.stringify({
      ywsession: "wk22o2fmjrg48snrtou2as19gurpvb5c",
      Cookie:
        "ywguid=111;ywkey=ywemcbEW649f;platform=ios;channel=mqqmina;mpVersion=0.29.4",
      Connection: "keep-alive",
      "Content-Type": "application/json",
      Accept: "*/*",
      Host: "mqqapi.reader.qq.com",
      "User-Agent": "QQ/8.4.5.626 CFNetwork/1120 Darwin/19.0.0",
      Referer: "https://appservice.qq.com/1110657249/0.29.4/page-frame.html",
      "Accept-Language": "zh-cn",
      "Accept-Encoding": "gzip, deflate, br",
      mpversion: "0.29.4",
    }),
    qqreadtimeurlVal:
      "https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=1007&refer=-1&bid=26878703&readTime=5083&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A5083%2C%22pay_status%22%3A0%7D%7D%5D&sp=-1",
    qqreadtimeheaderVal: JSON.stringify({
      ywsession: "wk22o2fmjrg48snrtou2as19gurpvb5c",
      Cookie:
        "ywguid=111;ywkey=ywemcbEW649f;platform=ios;channel=mqqmina;mpVersion=0.29.4;qq_ver=8.4.5;os_ver=iOS 13.2.3;mpos_ver=1.18.0;platform=ios;openid=DD52CCE8A2AD4B50CFA38C1106F33208",
      Connection: "keep-alive",
      "Content-Type": "application/json",
      Accept: "*/*",
      Host: "mqqapi.reader.qq.com",
      "User-Agent": "QQ/8.4.5.626 CFNetwork/1120 Darwin/19.0.0",
      Referer: "https://appservice.qq.com/1110657249/0.29.4/page-frame.html",
      "Accept-Language": "zh-cn",
      "Accept-Encoding": "gzip, deflate, br",
      mpversion: "0.29.4",
    }),
  },
  {
    qqreadheaderVal: JSON.stringify({
      ywsession: "tqmlejkp6je8ndm3eskf9cnliu0if1p0",
      Cookie:
        "ywguid=111;ywkey=ywyv3tRPAfMQ;platform=ios;channel=mqqmina;mpVersion=0.29.4",
      Connection: "keep-alive",
      "Content-Type": "application/json",
      Accept: "*/*",
      Host: "mqqapi.reader.qq.com",
      "User-Agent": "QQ/8.4.5.626 CFNetwork/1120 Darwin/19.0.0",
      Referer: "https://appservice.qq.com/1110657249/0.29.4/page-frame.html",
      "Accept-Language": "zh-cn",
      "Accept-Encoding": "gzip, deflate, br",
      mpversion: "0.29.4",
    }),
    qqreadtimeurlVal:
      "https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=1007&refer=-1&bid=713632&readTime=6692&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%223%22%3A%7B%22readTime%22%3A6692%2C%22pay_status%22%3A0%7D%7D%5D&sp=-1",
    qqreadtimeheaderVal: JSON.stringify({
      ywsession: "tqmlejkp6je8ndm3eskf9cnliu0if1p0",
      Cookie:
        "ywguid=111;ywkey=ywyv3tRPAfMQ;platform=ios;channel=mqqmina;mpVersion=0.29.4;qq_ver=8.4.5;os_ver=iOS 13.2.3;mpos_ver=1.18.0;platform=ios;openid=0B9F94052F27ECEDA02019DAAC1255E1",
      Connection: "keep-alive",
      "Content-Type": "application/json",
      Accept: "*/*",
      Host: "mqqapi.reader.qq.com",
      "User-Agent": "QQ/8.4.5.626 CFNetwork/1120 Darwin/19.0.0",
      Referer: "https://appservice.qq.com/1110657249/0.29.4/page-frame.html",
      "Accept-Language": "zh-cn",
      "Accept-Encoding": "gzip, deflate, br",
      mpversion: "0.29.4",
    }),
  },
];

var tz = "";
let num = 0;
all();

function all() {
  qqreadheaderVal = cookiesArr[num].qqreadheaderVal;
  qqreadtimeurlVal = cookiesArr[num].qqreadtimeurlVal;
  qqreadtimeheaderVal = cookiesArr[num].qqreadtimeheaderVal;
  for (var i = 0; i < 18; i++) {
    (function (i) {
      setTimeout(
        function () {
          if (i == 0) qqreadinfo();
          //用户名
          else if (i == 1) qqreadconfig();
          //时长查询
          else if (i == 2) qqreadtask();
          //任务列表
          else if (i == 3) qqreadsign();
          //金币签到
          else if (i == 4 && task.data.treasureBox.doneFlag == 0) qqreadbox();
          //宝箱
          else if (i == 5 && task.data.taskList[2].doneFlag == 0) qqreadssr1();
          //阅读金币1
          else if (i == 6) qqreadtime();
          //上传时长
          else if (i == 7 && task.data.taskList[0].doneFlag == 0) qqreadtake();
          //阅豆签到
          else if (i == 8 && task.data.taskList[1].doneFlag == 0)
            qqreaddayread();
          //阅读任务
          else if (i == 9 && task.data.taskList[2].doneFlag == 0) qqreadssr2();
          //阅读金币2
          else if (i == 10 && task.data.taskList[3].doneFlag == 0)
            qqreadvideo();
          //视频任务
          else if (i == 11 && sign.data.videoDoneFlag == 0) qqreadsign2();
          //签到翻倍
          else if (i == 12 && task.data.treasureBox.videoDoneFlag == 0)
            qqreadbox2();
          //宝箱翻倍
          else if (i == 13 && task.data.taskList[2].doneFlag == 0) qqreadssr3();
          //阅读金币3
          else if (i == 14) qqreadwktime();
          //周时长查询
          else if (i == 15) qqreadpick();
          //领周时长奖励
          else if (i == 16) showmsg();
          else if (i == 17 && num < cookiesArr.length - 1) {
            num += 1;
            all();
          } else if (i == 17 && num == cookiesArr.length - 1) {
            $.done();
          }
        },

        (i + 1) * dd * 1000
      );
    })(i);
  }
}

//任务列表
function qqreadtask() {
  return new Promise((resolve, reject) => {
    const toqqreadtaskurl = {
      url: "https://mqqapi.reader.qq.com/mqq/red_packet/user/page?fromGuid=",
      headers: JSON.parse(qqreadheaderVal),

      timeout: 60000,
    };
    $.get(toqqreadtaskurl, (error, response, data) => {
      if (logs) $.log(`${jsname}, 任务列表: ${data}`);
      task = JSON.parse(data);
      tz +=
        "【任务列表】:余额" +
        task.data.user.amount +
        "金币\n" +
        "【第" +
        task.data.invite.issue +
        "期】:时间" +
        task.data.invite.dayRange +
        "\n" +
        "已邀请" +
        task.data.invite.inviteCount +
        "人，再邀请" +
        task.data.invite.nextInviteConfig.count +
        "人获得" +
        task.data.invite.nextInviteConfig.amount +
        "金币\n" +
        "【" +
        task.data.taskList[0].title +
        "】:" +
        task.data.taskList[0].amount +
        "金币," +
        task.data.taskList[0].actionText +
        "\n" +
        "【" +
        task.data.taskList[1].title +
        "】:" +
        task.data.taskList[1].amount +
        "金币," +
        task.data.taskList[1].actionText +
        "\n" +
        "【" +
        task.data.taskList[2].title +
        "】:" +
        task.data.taskList[2].amount +
        "金币," +
        task.data.taskList[2].actionText +
        "\n" +
        "【" +
        task.data.taskList[3].title +
        "】:" +
        task.data.taskList[3].amount +
        "金币," +
        task.data.taskList[3].actionText +
        "\n" +
        "【宝箱任务" +
        (task.data.treasureBox.count + 1) +
        "】:" +
        task.data.treasureBox.tipText +
        "\n" +
        "【" +
        task.data.fans.title +
        "】:" +
        task.data.fans.fansCount +
        "个好友," +
        task.data.fans.todayAmount +
        "金币\n";

      resolve();
    });
  });
}

//用户名
function qqreadinfo() {
  return new Promise((resolve, reject) => {
    const toqqreadinfourl = {
      url: qqreadurlVal,
      headers: JSON.parse(qqreadheaderVal),
      timeout: 60000,
    };
    $.get(toqqreadinfourl, (error, response, data) => {
      console.log(data);
      if (logs) $.log(`${jsname}, 用户名: ${data}`);
      info = JSON.parse(data);
      tz += "【用户信息】:" + info.data.user.nickName + "\n";

      resolve();
    });
  });
}

//阅豆签到
function qqreadtake() {
  return new Promise((resolve, reject) => {
    const toqqreadtakeurl = {
      url: "https://mqqapi.reader.qq.com/mqq/sign_in/user",

      headers: JSON.parse(qqreadheaderVal),
      timeout: 60000,
    };
    $.post(toqqreadtakeurl, (error, response, data) => {
      if (logs) $.log(`${jsname}, 阅豆签到: ${data}`);
      take = JSON.parse(data);

      if (take.data.takeTicket > 0) {
        tz += "【阅豆签到】:获得" + take.data.takeTicket + "豆\n";
      }

      resolve();
    });
  });
}

//阅读时长任务
function qqreadconfig() {
  return new Promise((resolve, reject) => {
    const toqqreadconfigurl = {
      url:
        "https://mqqapi.reader.qq.com/mqq/page/config?router=%2Fpages%2Fbook-read%2Findex&options=",
      headers: JSON.parse(qqreadheaderVal),
    };

    $.get(toqqreadconfigurl, (error, response, data) => {
      if (logs) $.log(`${jsname}, 阅读时长查询: ${data}`);
      config = JSON.parse(data);
      if (config.code == 0)
        tz +=
          "【时长查询】:今日阅读" +
          (config.data.pageParams.todayReadSeconds / 60).toFixed(0) +
          "分钟\n";

      resolve();
    });
  });
}
