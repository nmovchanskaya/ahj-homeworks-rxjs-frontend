import getData from '../../getData';

export default class EmailWidget {
  constructor(container) {
    this.container = container;
    this.emailIds = [];
    if (process.env.NODE_ENV === 'development') {
      this.url = 'http://localhost:7070/messages/unread';
    } else {
      this.url = 'https://ahj-homeworks-rxjs-backend-a8hi.onrender.com/messages/unread';
    }
  }

  bindToDOM() {
    this.containerElem = document.querySelector(this.container);
  }

  renderContent() {
    this.tableElem = this.tableMarkup();
  }

  getNewEmails() {
    const stream$ = getData(this.url, { ids: this.emailIds }, 'messages');

    const sub = stream$.subscribe((messages) => {
      console.log(messages);
      this.renderEmails(this.emailElem, messages);
    });

    // unsubscribe after 5 times
    setTimeout(() => {
      sub.unsubscribe();
    }, 52000);
  }

  tableMarkup() {
    const table = document.createElement('table');
    table.innerHTML = `
        <table class="email-table">
            <th>
                From
            </th>
            <th>
                Subject
            </th>
            <th>
                Date
            </th>
        </table>
    `;
    this.containerElem.insertBefore(table, null);
    return table;
  }

  renderEmailItem(email) {
    const emailElem = document.createElement('tr');
    const date = new Date(email.received);
    let subject;
    if (email.subject.length > 15) {
      subject = `${email.subject.substr(0, 15)}...`;
    } else {
      subject = email.subject;
    }
    emailElem.innerHTML = `
        <tr>
            <td class="from">
                ${email.from}
            </td>
            <td class="subject">
                ${subject}
            </td>
            <td class="date">
                ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')} ${date.getDate().toString().padStart(2, '0')}.${date.getMonth().toString().padStart(2, '0')}.${date.getFullYear()}
            </td>
        </tr>
    `;
    // save email.id in widget
    this.emailIds.push(email.id);
    return emailElem;
  }

  renderEmails(tableElem, emails) {
    emails.forEach((email) => {
      const elem = this.renderEmailItem(email);
      const firstElem = this.tableElem.querySelectorAll('tr')[1];
      if (!firstElem) {
        this.tableElem.insertBefore(elem, null);
      } else {
        this.tableElem.insertBefore(elem, firstElem);
      }
    });
  }
}
