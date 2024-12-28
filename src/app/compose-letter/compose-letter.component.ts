import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LetterService} from "../letter.service";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatTabGroup, MatTabsModule} from "@angular/material/tabs";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";

@Component({
  selector: 'app-compose-letter',
  standalone: true,
  imports: [CommonModule,FormsModule,MatTabsModule,MatCardModule,MatButtonModule,MatFormFieldModule],
  templateUrl: './compose-letter.component.html',
  styleUrl: './compose-letter.component.css'
})
export class ComposeLetterComponent {

  recipient: string = '';
  subject: string = '';
  message: string = '';
  file: any = null;
  isReply: boolean = false;
  isForward: boolean = false;
  originalLetter: any = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private letterService: LetterService  // اضافه کردن سرویس
  ) {}

  ngOnInit() {
    const letterId = this.route.snapshot.queryParamMap.get('letterId');
    if (letterId) {
      this.originalLetter = JSON.parse(localStorage.getItem('inbox') || '[]').find(
        (letter: any) => letter.id === letterId
      );
      this.subject = this.isReply ? 'Re: ' + this.originalLetter.subject : this.originalLetter.subject;
      this.message = this.isReply ? '\n\n--- Reply ---\n' + this.originalLetter.message : '';
      this.isReply = true;
    }
  }

  onSubmit() {
    const letter = {
      recipient: this.recipient,
      subject: this.subject,
      message: this.message,
      file: this.file,
      status: this.isForward ? 'Forwarded' : 'Sent'
    };

    this.letterService.saveLetter(letter, 'sent');  // استفاده از سرویس برای ذخیره نامه
    alert('Letter sent successfully!');
    this.router.navigate(['/dashboard']);
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  forwardLetter() {
    this.isForward = true;
    this.subject = 'Fwd: ' + this.originalLetter.subject;
    this.message = '\n\n--- Forwarded ---\n' + this.originalLetter.message;
  }
}
