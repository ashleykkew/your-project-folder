document.addEventListener('DOMContentLoaded', function() {
    const userEmail = prompt("Enter your email:"); // Simulating user login. Replace with your actual login logic
  
    function saveEvent(event) {
      event.preventDefault();
      const eventName = document.getElementById('event-name').value;
      const eventDate = document.getElementById('event-date').value;
      const eventDescription = document.getElementById('event-description').value;
      const eventStartTime = document.getElementById('event-start-time').value;
      const eventEndTime = document.getElementById('event-end-time').value;
      const eventLocation = document.getElementById('event-location').value;
      const eventLocationLine2 = document.getElementById('event-location-line2').value;
      const eventIsFree = document.getElementById('event-is-free').checked;
      const eventCost = eventIsFree ? '' : document.getElementById('event-cost').value;
      const eventGuestRequirements = document.getElementById('event-guest-requirements').value;
      const eventHasDresscode = document.getElementById('event-has-dresscode').checked;
      const dresscodeDetails = eventHasDresscode ? document.getElementById('dresscode-details').value : '';
      const hostName = document.getElementById('host-name').value;
      const hostEmail = document.getElementById('host-email').value;
      const hostPhone = document.getElementById('host-phone').value;
  
      const eventData = {
        eventName,
        eventDate,
        eventDescription,
        eventStartTime,
        eventEndTime,
        eventLocation,
        eventLocationLine2,
        eventIsFree,
        eventCost,
        eventGuestRequirements,
        eventHasDresscode,
        dresscodeDetails,
        hostName,
        hostEmail,
        hostPhone,
        userEmail // Storing user email for event segregation
      };
  
      let events = JSON.parse(localStorage.getItem('events')) || [];
      events.push(eventData);
      localStorage.setItem('events', JSON.stringify(events));
  
      showModal('Event Created Successfully!');
    }
  
    function showModal(message) {
      const modal = document.getElementById('myModal');
      const modalMessage = document.getElementById('modal-message');
      const closeModal = document.getElementById('closeModal');
      modalMessage.textContent = message;
      modal.style.display = 'block';
  
      closeModal.onclick = function() {
        modal.style.display = 'none';
      }
  
      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = 'none';
        }
      }
    }
  
    document.getElementById('create-event-form').addEventListener('submit', saveEvent);
  
    function populateEventList() {
      const eventList = document.getElementById('event-list');
      const events = JSON.parse(localStorage.getItem('events')) || [];
      eventList.innerHTML = '';
  
      events.forEach(event => {
        if (event.userEmail === userEmail) { // Display only user's events
          const eventDiv = document.createElement('div');
          eventDiv.className = 'event';
          eventDiv.innerHTML = `
            <h3>${event.eventName}</h3>
            <p><strong>Date:</strong> ${event.eventDate}</p>
            <p><strong>Description:</strong> ${event.eventDescription}</p>
            <p><strong>Start Time:</strong> ${event.eventStartTime}</p>
            <p><strong>End Time:</strong> ${event.eventEndTime}</p>
            <p><strong>Location:</strong> ${event.eventLocation}</p>
            <p><strong>Additional Info:</strong> ${event.eventLocationLine2}</p>
            <p><strong>Cost:</strong> ${event.eventCost || 'Free'}</p>
            <p><strong>Guest Requirements:</strong> ${event.eventGuestRequirements}</p>
            <p><strong>Dress Code:</strong> ${event.dresscodeDetails || 'None'}</p>
            <p><strong>Host Name:</strong> ${event.hostName}</p>
            <p><strong>Host Email:</strong> ${event.hostEmail}</p>
            <p><strong>Host Phone:</strong> ${event.hostPhone}</p>
          `;
          eventList.appendChild(eventDiv);
        }
      });
    }
  
    populateEventList();
  });
  