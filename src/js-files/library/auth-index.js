// DOM elements
const galleryList = document.querySelector('.library-gallery');

// setup gallery
export const setupGallery = data => {
  let html = '';
  data.forEach(gallery => {
    const div = `
      <div>
      <div> ${gallery.title || ''} </div>
      <div> ${gallery.content || ''} </div>
      <div> ${gallery.first || ''} </div>
      <div> ${gallery.last || ''} </div>
      <div> ${gallery.born || ''} </div>
      </div>
    `;
    html += div;
  });
  galleryList.innerHTML = html;
};

//#################################
// setup materialize components
document.addEventListener('DOMContentLoaded', function () {
  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);
});
