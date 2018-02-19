// copy in your "ex2.js" or "ex2-fixed.js" code
function NotesManager(){

}
NotesManager.prototype.addNote = (function() {
  function addNote(note) {
    this.$('#notes').prepend(
      $('<a href=\'#\'></a>')
        .addClass('note')
        .text(note)
    );
  }
  
  NotesManager.prototype.addCurrentNote() {
    var current_note = this.$('#note').val();
  
    if (current_note) {
      this.notes.push(current_note);
      this.addNote(current_note);
      this.$('#note').val('');
    }
  }
  
  NotesManager.prototype.showHelp() {
      var self = this;
    this.$('#help').show();
  
    document.addEventListener(
      'click',
      function __handler__(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        evt.stopImmediatePropagation();
  
        document.removeEventListener('click', __handler__, true);
        self.hideHelp();
      },
      true
    );
  }
  
  function hideHelp() {
    $('#help').hide();
  }
  
  function handleOpenHelp(evt) {
    if (!$('#help').is(':visible')) {
      evt.preventDefault();
      evt.stopPropagation();
  
      showHelp();
    }
  }
  
  function handleAddNote(evt) {
    addCurrentNote();
  }
  
  function handleEnter(evt) {
    if (evt.which == 13) {
      addCurrentNote();
    }
  }
  
  function handleDocumentClick(evt) {
    $('#notes').removeClass('active');
    $('#notes')
      .children('.note')
      .removeClass('highlighted');
  }
  
  function handleNoteClick(evt) {
    evt.preventDefault();
    evt.stopPropagation();
  
    $('#notes').addClass('active');
    $('#notes')
      .children('.note')
      .removeClass('highlighted');
    $(evt.target).addClass('highlighted');
  }
  
  function init() {
    // build the initial list from the existing `notes` data
    var html = '';
    for (i = 0; i < notes.length; i++) {
      html += '<a href=\'#\' class=\'note\'>' + notes[i] + '</a>';
    }
    $('#notes').html(html);
  
    // listen to "help" button
    $('#open_help').bind('click', handleOpenHelp);
  
    // listen to "add" button
    $('#add_note').bind('click', handleAddNote);
  
    // listen for <enter> in text box
    $('#new_note').bind('keypress', handleEnter);
  
    // listen for clicks outside the notes box
    $(document).bind('click', handleDocumentClick);
  
    // listen for clicks on note elements
    $('#notes').on('click', '.note', handleNoteClick);
  }
  
  //take an arr of records and add to the existing internal arr
  function loadData(data) {
    notes = notes.concat(data);
  }
  
  var notes = [];
  
  var publicAPI = {
    init: init,
    loadData: loadData
  };
  return publicAPI;
})();
  
NotesManager.loadData([
  'This is the first note I\'ve taken!',
  'Now is the time for all good men to come to the aid of their country.',
  'The quick brown fox jumped over the moon.'
]);
$(document).ready(NotesManager.init);
  