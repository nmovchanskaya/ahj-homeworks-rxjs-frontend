import EmailWidget from './components/email/emailWidget';

const emailWidget = new EmailWidget('.container');
emailWidget.bindToDOM();
emailWidget.renderContent();
emailWidget.getNewEmails();
