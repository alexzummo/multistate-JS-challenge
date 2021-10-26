/**

1. Start by cloning this JS Bin by going to File > Clone
2. Create a markdown function using regular expressions to convert the strings to formatted html.
3. Output the html strings to js console.
4. (Bonus) Render the html strings in the html output.

To learn more about markdown and regular expressions, please refer to:
https://guides.github.com/features/mastering-markdown/
https://www.w3schools.com/js/js_regexp.asp

**/

let strings = [
  'This is **bold** text.',
  'This is __underlined__ text.',
  'This is ~~strikethrough~~ text.',
  'This is *italic* text.',
  'This is a hyperlink: https://www.google.com/',
  'This is an email: leeroy.jenkins@gmail.com'
];



function markdownToHTML(s){
  // Written by Alexander W. Zummo (e: alexander.zummo@gmail.com)
  // s: markdown-formatted string
  // return: HTML rendering of s
  // assumptions: s could have any number of instances of any tag shown in the example
  let regexStylers = { // "{0} is a placeholder"
    "<b>{0}</b>": /\*\*(.*)\*\*/,
    "<u>{0}</u>": /\_\_(.*)\_\_/,
    "<strike>{0}</strike>": /\~\~(.*)\~\~/,
    "<i>{0}</i>": /\*(.*)\*/,
    "<a href={0}>{0}</a>": /(https?:\/\/\S*)/,
    // This will only catch basic emails, and may match many invalid emails
    // I'm happy to make a more robust version if needed
    '<a href="mailto:{0}">{0}</a>': /([^@\s]*@[^@\.\s]*\.[A-Za-z]{2,})/
    // this one was more robust, but seemed to cause the script to hang in this environment
    // (([^@\.\s]([^@\s])*)*[^\.\s@]@[^@\.\s]*(\.[^@\.\s]*)*\.[A-Za-z]{2,})
  }
  let regMatch, innerMatch, replacement
  
  // for each regex, search and make all possible replacements
  Object.keys(regexStylers).map((key) => {
    regMatch = s.match(new RegExp(regexStylers[key], "g"))
    if(regMatch != null){
      // for each matched, unaltered string in s, make necessary replacement
      for (let i=0; i<regMatch.length; i++){
        innerMatch = regMatch[i].match(regexStylers[key]);
        replacement = key
        while(replacement.includes("{0}")){
          replacement = replacement.replace("{0}", innerMatch[1]); // use full link as href and text when needed
        }
        s = s.replace(innerMatch[0], replacement); // do final replacement in s
      }
    }
  })
  console.log(s)
  return s

}

strings.map(item => {
  document.getElementById('myContent').innerHTML += markdownToHTML(item) + "<br>"
})



// END OF FILE (ad blocks the rest)



