import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LetterService {
  private storage = {
    inbox: JSON.parse(localStorage.getItem('inbox') || '[]'),
    sent: JSON.parse(localStorage.getItem('sent') || '[]'),
    drafts: JSON.parse(localStorage.getItem('drafts') || '[]'),
  };

  getLetters(type: 'inbox' | 'sent' | 'drafts'): any[] {
    return this.storage[type] || [];
  }

  saveLetter(letter: any, type: 'inbox' | 'sent' | 'drafts'): void {
    if (!this.storage[type]) {
      this.storage[type] = [];
    }
    this.storage[type].push(letter);
    localStorage.setItem(type, JSON.stringify(this.storage[type]));
  }

  replyToLetter(letter: any, replyMessage: string): void {
    const reply = {
      recipient: letter.recipient,
      subject: `RE: ${letter.subject}`,
      message: replyMessage,
      timestamp: new Date(),
    };
    this.saveLetter(reply, 'sent');
  }

  forwardLetter(letter: any, forwardMessage: string): void {
    const forward = {
      recipient: '',
      subject: `FWD: ${letter.subject}`,
      message: `${forwardMessage}\n\nOriginal Message:\n${letter.message}`,
      timestamp: new Date(),
    };
    this.saveLetter(forward, 'sent');
  }
}
