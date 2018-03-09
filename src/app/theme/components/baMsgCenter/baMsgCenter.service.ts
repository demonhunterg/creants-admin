import {Injectable} from '@angular/core'

@Injectable()
export class BaMsgCenterService {

  private _notifications = [
    {
      name: 'Vlad',
      text: 'CPU vượt quá 50%.',
      time: 'Cách đây 1 phút'
    },
    {
      name: 'Kostya',
      text: 'Hết bộ nhớ.',
      time: 'Cách đây 2 giờ'
    },
    {
      image: 'assets/img/shopping-cart.svg',
      text: 'Cập nhật CCU.',
      time: 'Cách đây 3 giờ'
    }
  ];

  private _messages = [
    {
      name: 'Nasta',
      text: 'Lam Ha vừa gửi mail cho user mus1#327...',
      time: 'Cách đây 1 phút'
    },
    {
      name: 'Vlad',
      text: 'Lam Ha vừa gửi mail cho user mus1#327...',
      time: 'Cách đây 3 giờ'
    }
  ];

  public getMessages():Array<Object> {
    return this._messages;
  }

  public getNotifications():Array<Object> {
    return this._notifications;
  }
}
