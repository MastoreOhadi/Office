import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {LetterService} from "../letter.service";
import {HttpClientModule} from "@angular/common/http";
import {MatTabsModule} from "@angular/material/tabs";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,FormsModule,MatFormFieldModule,MatCardModule,MatTableModule,HttpClientModule, MatTabsModule,],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  inbox: any[] = [];
  sent: any[] = [];
  drafts: any[] = [];
  newLetter = {
    recipient: '',
    subject: '',
    message: '',
    file: null,
  };

  constructor(private letterService: LetterService) {}

  ngOnInit(): void {
    this.loadInbox();
    this.loadSent();
    this.loadDrafts();
  }

  loadInbox(): void {
    this.inbox = this.letterService.getLetters('inbox');
  }

  loadSent(): void {
    this.sent = this.letterService.getLetters('sent');
  }

  loadDrafts(): void {
    this.drafts = this.letterService.getLetters('drafts') || [];
  }

  sendLetter(): void {
    if (!this.newLetter.recipient || !this.newLetter.subject || !this.newLetter.message) {
      alert('Please fill all fields before sending.');
      return;
    }
    this.letterService.saveLetter(this.newLetter, 'sent');
    this.newLetter = { recipient: '', subject: '', message: '', file: null };
    this.loadSent();
    alert('Letter sent successfully!');
  }

  replyToLetter(letter: any): void {
    const replyMessage = prompt('Enter your reply message:');
    if (replyMessage) {
      this.letterService.replyToLetter(letter, replyMessage);
      this.loadSent();
      alert('Reply sent successfully!');
    }
  }

  forwardLetter(letter: any): void {
    const forwardMessage = prompt('Enter your forward message:');
    if (forwardMessage) {
      this.letterService.forwardLetter(letter, forwardMessage);
      this.loadSent();
      alert('Letter forwarded successfully!');
    }
  }

  viewLetter(letter: any): void {
    alert(
      `Viewing Letter\nRecipient: ${letter.recipient}\nSubject: ${letter.subject}\nMessage: ${letter.message}`
    );
  }

  saveDraft(): void {
    if (!this.newLetter.subject || !this.newLetter.message) {
      alert('Draft must have at least a subject and a message.');
      return;
    }
    this.letterService.saveLetter(this.newLetter, 'drafts');
    this.newLetter = { recipient: '', subject: '', message: '', file: null };
    this.loadDrafts();
    alert('Draft saved successfully!');
  }

  editDraft(letter: any): void {
    this.newLetter = { ...letter };
    const index = this.drafts.indexOf(letter);
    if (index > -1) {
      this.drafts.splice(index, 1);
      localStorage.setItem('drafts', JSON.stringify(this.drafts));
    }
  }
}
