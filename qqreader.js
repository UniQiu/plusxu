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
      ywsession: "uxdsbqhs5jhqrt37yg9nleannrdsb8oq",
      Cookie:
        "ywguid=768875064;ywkey=yw17H3356EPO;platform=ios;channel=mqqmina;mpVersion=0.28.0",
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
      "https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=2016&refer=-1&bid=27693007&readTime=6713&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A6713%2C%22pay_status%22%3A0%7D%7D%5D&sp=-1",
    qqreadtimeheaderVal: JSON.stringify({
      ywsession: "uxdsbqhs5jhqrt37yg9nleannrdsb8oq",
      Cookie:
        "ywguid=768875064;ywkey=yw17H3356EPO;platform=ios;channel=mqqmina;mpVersion=0.28.0;qq_ver=8.4.10;os_ver=iOS 14.2;mpos_ver=1.20.0;platform=ios;openid=BF291E1616E5FD202F796144668E3503",
      Connection: "keep-alive",
      "Content-Type": "application/json",
      Accept: "*/*",
      Host: "mqqapi.reader.qq.com",
      "User-Agent": "QQ/8.4.10.666 CFNetwork/1206 Darwin/20.1.0",
      Referer: "https://appservice.qq.com/1110657249/0.28.0/page-frame.html",
      "Accept-Language": "zh-cn",
      "Accept-Encoding": "gzip, deflate, br",
      mpversion: "0.28.0",
    }),
  },
  {
    qqreadheaderVal: JSON.stringify({
      ywsession: "tdcr4aspwn6gz1n1i8ntokx9qrz18eiq",
      Cookie:
        "ywguid=1970290483;ywkey=ywTh1q4iHzEL;platform=ios;channel=mqqmina;mpVersion=0.29.4",
      Connection: "keep-alive",
      "Content-Type": "application/json",
      Accept: "*/*",
      Host: "mqqapi.reader.qq.com",
      "User-Agent": "QQ/8.4.10.666 CFNetwork/1206 Darwin/20.1.0",
      Referer: "https://appservice.qq.com/1110657249/0.29.4/page-frame.html",
      "Accept-Language": "zh-cn",
      "Accept-Encoding": "gzip, deflate, br",
      mpversion: "0.29.4",
    }),
    qqreadtimeurlVal:
    "https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=2016&refer=-1&bid=13785294&readTime=3572&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A3572%2C%22pay_status%22%3A0%2C%22is_tail%22%3A0%7D%7D%5D&sp=-1",
     qqreadtimeheaderVal: JSON.stringify({
      ywsession: "tdcr4aspwn6gz1n1i8ntokx9qrz18eiq",
      Cookie:
        "ywguid=1970290483;ywkey=ywTh1q4iHzEL;platform=ios;channel=mqqmina;mpVersion=0.29.4;qq_ver=8.4.10;os_ver=iOS 14.2;mpos_ver=1.20.0;platform=ios;openid=1D08A4CC8E547095DB02DB3F4C45C34B",
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
