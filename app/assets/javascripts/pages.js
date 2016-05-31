$(function() {
    $('#edit').froalaEditor({
      toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'color', 'paragraphStyle', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', 'insertHR', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', 'undo', 'redo', 'clearFormatting', 'star'],
      toolbarSticky: true,
      toolbarInline: true,
      theme: 'gray',
      zIndex: 2003
    });

    $('#edit').on('froalaEditor.toolbar.show', function (e, editor) {
            var a = getSelectionText();
            console.log(a.replace(/ /g,"%20"));

            function getSelectionText() {
                var text = "";
                if (window.getSelection) {
                    text = window.getSelection().toString();
                } else if (document.selection && document.selection.type != "Control") {
                    text = document.selection.createRange().text;
                }
                return text;
            }
    });
});