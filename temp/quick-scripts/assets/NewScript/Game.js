(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/NewScript/Game.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '19a7a6cIVtGpJ0dL1ultgSe', 'Game', __filename);
// NewScript/Game.ts

Object.defineProperty(exports, "__esModule", { value: true });
// Learn TypeScript:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/typescript/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.starPrefab = null;
        _this.ground = null;
        _this.player = null;
        _this.scoreDisplay = null;
        _this.scoreAudio = null;
        // 星星产生后消失时间的随机范围
        _this.maxStarDuration = 5;
        _this.minStarDuration = 3;
        // 获得地面的Y坐标
        _this.groundY = 0;
        // 初始化计分
        _this.score = 0;
        // 初始化计时器
        _this.timer = 0;
        // 初始化星星存在时间
        _this.starDuration = 0;
        return _this;
        // update (dt) {},
    }
    NewClass.prototype.start = function () {
        this.groundY = this.ground.y + this.ground.height / 2;
        this.spawnNewStar();
    };
    NewClass.prototype.update = function (dt) {
        //每帧更新计时器，超过限度还没有生成新的星星
        // 就会调用游戏失败逻辑
        if (this.timer > this.starDuration) {
            this.gameOver();
            return;
        }
        this.timer += dt;
    };
    NewClass.prototype.gameOver = function () {
        this.player.stopAllActions(); // 停止player节点的跳跃动作
        cc.director.loadScene('game');
    };
    NewClass.prototype.gainScore = function () {
        this.score += 1;
        // 更新scoreDisplay Label的文字
        this.scoreDisplay.string = 'Score:' + this.score.toString();
        // 播放得分音效
        cc.audioEngine.playEffect(this.scoreAudio, false);
    };
    NewClass.prototype.spawnNewStar = function () {
        // 使用给定的模板在场景中生成一个新节点
        var newStar = cc.instantiate(this.starPrefab);
        // 将新增的节点添加到Canvas节点下面
        this.node.addChild(newStar);
        // 为星星设置一个随机位置
        newStar.setPosition(this.getNewStarPosition());
        // 将game组建的实例传入星星组件
        newStar.getComponent('Star').game = this;
        // 重置计时器，根据消失时间范围随机取一个值
        this.starDuration = this.minStarDuration + cc.random0To1() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;
    };
    NewClass.prototype.getNewStarPosition = function () {
        var randX = 0;
        // 根据地平面位置和主角跳跃高度，随机得到一个星星的y坐标
        var randY = this.groundY + cc.random0To1() * this.player.getComponent('Player').jumpHeight + 50;
        // 根据屏幕宽度，随机得到一个星星的x坐标
        var maxX = this.node.width / 2;
        randX = cc.randomMinus1To1() * maxX;
        // 返回星星坐标
        return cc.p(randX, randY);
    };
    __decorate([
        property(cc.Prefab)
    ], NewClass.prototype, "starPrefab", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "ground", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "player", void 0);
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "scoreDisplay", void 0);
    __decorate([
        property(cc.AudioClip)
    ], NewClass.prototype, "scoreAudio", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Game.js.map
        