export default class NotificationMessage {
  static activeNotification;

  constructor(message, { duration = 2000, type = "success" } = {}) {
    if (this.activeNotification) {
      this.activeNotification.remove();
    }

    this.message = message;
    this.durationInSeconds = duration / 1000 + "s";
    this.type = type;
    this.duration = duration;

    this.render();
  }

  getNotificationTemplate() {
    return `<div class="notification ${this.type}" style="--value:${this.durationInSeconds}">
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header">Notification</div>
          <div class="notification-body">${this.message}</div>
        </div>
      </div>`;
  }

  render() {
    const wrap = document.createElement("div");

    wrap.innerHTML = this.getNotificationTemplate();

    const element = wrap.firstElementChild;

    this.element = element;
    this.activeNotification = element;
  }

  show(parentNode = document.querySelector("body")) {
    parentNode.append(this.element);

    setTimeout(() => {
      this.remove();
    }, this.duration);
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    this.activeNotification = null;
  }
}
