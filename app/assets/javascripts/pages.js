$(function() {
    $.FroalaEditor.DefineIcon('alert', {NAME: 'info'});
    $.FroalaEditor.RegisterCommand('alert', {
      title: 'Hello',
      focus: false,
      undo: false,
      refreshAfterCallback: false,
      callback: function () {
        alert('Hello!');
      }
    });

    $.FroalaEditor.DefineIcon('clear', {NAME: 'remove'});
    $.FroalaEditor.RegisterCommand('clear', {
      title: 'Clear HTML',
      focus: false,
      undo: true,
      refreshAfterCallback: true,
      callback: function () {
        this.html.set('');
        this.events.focus();
      }
    });

    $.FroalaEditor.DefineIcon('insert', {NAME: 'plus'});
    $.FroalaEditor.RegisterCommand('insert', {
      title: 'Insert HTML',
      focus: true,
      undo: true,
      refreshAfterCallback: true,
      callback: function () {
        this.html.insert('My New HTML');
      }
    });
    $('#edit').froalaEditor({
      toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'color', 'paragraphStyle', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', 'insertHR', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', 'undo', 'redo', 'clearFormatting', 'star'],
      toolbarSticky: true,
      toolbarInline: true,
    });
});