export default class UserInfo {
    constructor(
        {nameSelector, aboutSelector, avatarSelector}
        ) {
            this._userInfo = {};
            this._userNameElement = document.querySelector(nameSelector);
            this._userDescriptionElement = document.querySelector(aboutSelector);
            this._userAvatarElement = document.querySelector(avatarSelector)
    }  

    getUserInfo() {
        return this._userInfo;
    }

    setUserName({name}) {
        this._userInfo.name  = name
    }

    setUserAbout({about}) {
        this._userInfo.about = about
    }

    setUserAvatar({avatar}) {
        this._userInfo.avatar = avatar
    }

    setUserId(id) {
        this._userInfo.id = id
    }

    getUserId() {
        return this._userInfo.id
    }

    renderUserInfo(userData) {
        this._setUserInfo(userData);
        this.renderUserNameAndAbout();
        this.renderUserAvatar();
    }

    renderUserNameAndAbout() {
        this._userNameElement.textContent = this._userInfo.name;
        this._userDescriptionElement.textContent = this._userInfo.about;
    }

    renderUserAvatar() {
        this._userAvatarElement.src = this._userInfo.avatar
    }

    _setUserInfo({name, about, avatar, _id}) {
        this._userInfo.name = name
        this._userInfo.about = about
        this._userInfo.avatar = avatar
        this._userInfo.id = _id
    }
}