$(function() {

    $.FroalaEditor.DefineIcon('translate', {NAME: 'language'});
      $.FroalaEditor.RegisterCommand('translate', {
       title: 'Highlight as Code',
       focus: false,
       undo: false,
       refreshAfterCallback: false,
       callback: function (e){
            open_box();
       }
    });

    function open_box() {
      $(".fr-arrow").next().attr("data-toggle", "popover");
      $(".fr-arrow").next().attr("id", "translate_bitch");
      
      $('#translate_bitch').popover({
        html: true,
        content: function() {
          return $('#translate-content').html();
        },
        placement: 'bottom',
        container: 'body'
      });
      
      translate_text();
    }


    function translate_text() {
      
      
      $(document).on('click','#my_btn',function(e){
        var source = $( ".source:visible" ).val();
        var target = $( ".target:visible" ).val();
        var a = getSelectionText();
        translate(source, target, a.replace(/ /g,"%20"));
      });
 
    }




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
      toolbarButtons: ['translate','fullscreen', 'bold', 'italic', 'underline', 'color', 'paragraphStyle', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', 'insertHR', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', 'undo', 'redo', 'clearFormatting', 'star'],
      toolbarSticky: true,
      toolbarInline: true,
      theme: 'gray',
      zIndex: 2003
    });

   
    $.getJSON('/languages.json', function(data) {
        var my_data = data.data.languages;
        for (i = 0; i < my_data.length; i++) { 
            $(".source").append("<option value=" + my_data[i].language + ">" + my_data[i].name +  "</option>");
            $(".target").append("<option value=" + my_data[i].language + ">" + my_data[i].name +  "</option>");
        }
    });




});