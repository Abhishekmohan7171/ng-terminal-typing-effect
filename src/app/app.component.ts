import { Component,AfterViewInit,ViewChild,ElementRef } from '@angular/core';
import hljs from 'highlight.js';
import { timer } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'typing-effect';
  @ViewChild('codeBlock') codeBlockRef!: ElementRef;
  typingTimeout!:any


  ngAfterViewInit() {
      const target = this.codeBlockRef.nativeElement;
      // Highlight the code
      hljs.highlightBlock(target);
      // Get all the child nodes
      const children: Node[] = Array.from(target.childNodes);
      target.innerText = '';
      this.type(0, target, children);
    }

    type(i: number, target: HTMLElement, children: Node[]) {
      const charDelay = 25; //adjust typing speed here
      // const typingSpeed = 5;

      //checking if its the first iteration
      if (i === 0) {
        target.style.visibility = 'visible';
      }


      //checking whther the end of content so to effectively end the typing
      if (i >= children.length) {
        clearTimeout(this.typingTimeout);
        return;
      }

      const content = children[i].textContent || ''; //stores content of the current child node being typed const content = (children[i].textContent || '').split(/\s+/);

      let charIndex = 0;

      const displayChars = () => {
        if (charIndex < content.length) {
          target.appendChild(document.createTextNode(content.charAt(charIndex))); //appends a newly created text node to the target element. The text node contains the character at the current charIndex position in the content string.
          // Scroll the target element to bring the added character into view
          target.scrollTop = target.scrollHeight;

          hljs.highlightElement(target);

          charIndex++;

          this.typingTimeout = setTimeout(displayChars, charDelay);
        } else {
          if (content.includes('#')) {
            timer(2500).subscribe(()=>{
              i++;
              this.type(i,target, children)
            })
          } else {
              i++;
              this.type(i, target, children);
          }
        }
      };
      displayChars();
    }
}
