# NgTerminalTypingEffect 🔥

This basically creates a typing effect, like a terminal along with auto scroll depending on the height of the container for the code in the code tag , using the fucntion in the ts file. 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.1.

You can refer the git repo : [Click here](https://github.com/Abhishekmohan7171/ng-terminal-typing-effect)

## Documentation

### HTML File

Enter the code for which you want the effect as shown below.

```
<div class="editor ">
  <pre>
    <code #codeBlock class="code-block">
      <!-- type the code here for which you want the typing effect -->
    </code>
  </pre>
</div>
```

### TS File

```
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
          if (content.includes('#')) { // a pause of 2.5 sec if the word is #
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
```

In the above code the last condition is the to give a pause after any desired word , there it is '#' , you can modify the code like you need.


NOTE:Highlight Js is used here to highlight the syntax.Choose the desired theme in styles.css
Example:
```
@import '~highlight.js/styles/monokai-sublime.css';
```
also in the ts file make sure to import highlight js.
```
import hljs from 'highlight.js';
```

NOTE: Here ViewChild is used to connect the function to the desired tag we want the effect.

NOTE: Make sure this function is inside ngAfterViewInit(), also you can modify the typingSpeed variable for different typing speeds.




To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
