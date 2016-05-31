$(function() {

    $.FroalaEditor.DefineIcon('translate', {NAME: 'language'});
      $.FroalaEditor.RegisterCommand('translate', {
       title: 'Highlight as Code',
       focus: false,
       undo: false,
       refreshAfterCallback: false,
       callback: function (e){
            var a = getSelectionText();
            translate("en","pt", a.replace(/ /g,"%20"));  
       }
    });

    function getSelectionText() {
      var text = "";
      if (window.getSelection) {
          text = window.getSelection().toString();
      } else if (document.selection && document.selection.type != "Control") {
          text = document.selection.createRange().text;
      }
      return text;
    }

    function replaceSelectedText(replacementText) {
      var sel, range;
      if (window.getSelection) {
          sel = window.getSelection();
          if (sel.rangeCount) {
              range = sel.getRangeAt(0);
              range.deleteContents();
              range.insertNode(document.createTextNode(replacementText));
          }
      } else if (document.selection && document.selection.createRange) {
          range = document.selection.createRange();
          range.text = replacementText;
      }
    }

    function translate(source, target, q) {

        $.ajax({
          type: "GET",
          url: "https://www.googleapis.com/language/translate/v2?key=AIzaSyC4MIHuhn_ZgedJ1iQPaTUwrMpx_Nngbd4" + "&source=" + source + "&target=" + target + "&q=" + q,
          dataType: "json",
          success: processData,
        
          error: function(){ 
            alert("failed"); 
          }

        });

        function processData(data) {
              var new_text = data.data.translations[0].translatedText;
              replaceSelectedText(new_text);
        }

    }

    $('#edit').froalaEditor({
      toolbarButtons: ['translate', 'bold', 'italic', 'underline', 'paragraphStyle', 'formatOL', 'formatUL', 'insertHR', 'insertLink', 'insertImage', 'undo', 'redo', 'clearFormatting'],
      toolbarSticky: true,
      toolbarInline: true,
      theme: 'gray',
      zIndex: 2003
    });

    $.getJSON('/languages.json', function(data) {
        console.log(data.data.languages);
    });

});