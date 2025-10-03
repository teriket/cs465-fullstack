/**
 * userViews
 * @author Tanner Hunt
 * @date October 3, 2025
 * SNHU CS499 Computer Science Capstone
 * Enhancement 3: Databases
 * 
 * Purpose: Listens for when users click a link attached
 * to a specific vacation package, then increments the number
 * of times that webpage has been viewed.  At this time
 * 
 */


// after the webpage has laoded, search for any clickable trips
// that we are interested in tracking user views for
document.addEventListener('DOMContentLoaded', function () {
  const links = document.querySelectorAll('.trip-link');

  // search for clickable travel links
  links.forEach(link => {
    link.addEventListener('click', async function (e) {
      const tripCode = this.dataset.tripcode;
    
      // send a request through the incrementViews route
      try {
        request = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          }
        };

        await fetch(`/api/trips/${tripCode}/views`, request);

      } catch (err) {
        console.error('Error updating views:', err);
    }

    });
  });
});