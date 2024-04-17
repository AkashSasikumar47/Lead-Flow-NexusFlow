

(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach(e => e.addEventListener(type, listener))
    } else {
      select(el, all).addEventListener(type, listener)
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Sidebar toggle
   */
  if (select('.toggle-sidebar-btn')) {
    on('click', '.toggle-sidebar-btn', function (e) {
      select('body').classList.toggle('toggle-sidebar')
    })
  }

  /**
   * Search bar toggle
   */
  if (select('.search-bar-toggle')) {
    on('click', '.search-bar-toggle', function (e) {
      select('.search-bar').classList.toggle('search-bar-show')
    })
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Initiate tooltips
   */
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })

  /**
   * Initiate quill editors
   */
  if (select('.quill-editor-default')) {
    new Quill('.quill-editor-default', {
      theme: 'snow'
    });
  }

  if (select('.quill-editor-bubble')) {
    new Quill('.quill-editor-bubble', {
      theme: 'bubble'
    });
  }

  if (select('.quill-editor-full')) {
    new Quill(".quill-editor-full", {
      modules: {
        toolbar: [
          [{
            font: []
          }, {
            size: []
          }],
          ["bold", "italic", "underline", "strike"],
          [{
            color: []
          },
          {
            background: []
          }
          ],
          [{
            script: "super"
          },
          {
            script: "sub"
          }
          ],
          [{
            list: "ordered"
          },
          {
            list: "bullet"
          },
          {
            indent: "-1"
          },
          {
            indent: "+1"
          }
          ],
          ["direction", {
            align: []
          }],
          ["link", "image", "video"],
          ["clean"]
        ]
      },
      theme: "snow"
    });
  }

  /**
   * Initiate TinyMCE Editor
   */
  const useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isSmallScreen = window.matchMedia('(max-width: 1023.5px)').matches;

  tinymce.init({
    selector: 'textarea.tinymce-editor',
    plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons',
    editimage_cors_hosts: ['picsum.photos'],
    menubar: 'file edit view insert format tools table help',
    toolbar: 'undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
    toolbar_sticky: true,
    toolbar_sticky_offset: isSmallScreen ? 102 : 108,
    autosave_ask_before_unload: true,
    autosave_interval: '30s',
    autosave_prefix: '{path}{query}-{id}-',
    autosave_restore_when_empty: false,
    autosave_retention: '2m',
    image_advtab: true,
    link_list: [{
      title: 'My page 1',
      value: 'https://www.tiny.cloud'
    },
    {
      title: 'My page 2',
      value: 'http://www.moxiecode.com'
    }
    ],
    image_list: [{
      title: 'My page 1',
      value: 'https://www.tiny.cloud'
    },
    {
      title: 'My page 2',
      value: 'http://www.moxiecode.com'
    }
    ],
    image_class_list: [{
      title: 'None',
      value: ''
    },
    {
      title: 'Some class',
      value: 'class-name'
    }
    ],
    importcss_append: true,
    file_picker_callback: (callback, value, meta) => {
      /* Provide file and text for the link dialog */
      if (meta.filetype === 'file') {
        callback('https://www.google.com/logos/google.jpg', {
          text: 'My text'
        });
      }

      /* Provide image and alt text for the image dialog */
      if (meta.filetype === 'image') {
        callback('https://www.google.com/logos/google.jpg', {
          alt: 'My alt text'
        });
      }

      /* Provide alternative source and posted for the media dialog */
      if (meta.filetype === 'media') {
        callback('movie.mp4', {
          source2: 'alt.ogg',
          poster: 'https://www.google.com/logos/google.jpg'
        });
      }
    },
    templates: [{
      title: 'New Table',
      description: 'creates a new table',
      content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>'
    },
    {
      title: 'Starting my story',
      description: 'A cure for writers block',
      content: 'Once upon a time...'
    },
    {
      title: 'New list with dates',
      description: 'New List with dates',
      content: '<div class="mceTmpl"><span class="cdate">cdate</span><br><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>'
    }
    ],
    template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
    template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
    height: 600,
    image_caption: true,
    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
    noneditable_class: 'mceNonEditable',
    toolbar_mode: 'sliding',
    contextmenu: 'link image table',
    skin: useDarkMode ? 'oxide-dark' : 'oxide',
    content_css: useDarkMode ? 'dark' : 'default',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
  });

  /**
   * Initiate Bootstrap validation check
   */
  var needsValidation = document.querySelectorAll('.needs-validation')

  Array.prototype.slice.call(needsValidation)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })

  /**
   * Initiate Datatables
   */
  const datatables = select('.datatable', true)
  datatables.forEach(datatable => {
    new simpleDatatables.DataTable(datatable);
  })

  /**
   * Autoresize echart charts
   */
  const mainContainer = select('#main');
  if (mainContainer) {
    setTimeout(() => {
      new ResizeObserver(function () {
        select('.echart', true).forEach(getEchart => {
          echarts.getInstanceByDom(getEchart).resize();
        })
      }).observe(mainContainer);
    }, 200);
  }

})();





/**
   * Custom Added functions
   */



/**
   * Login Authentication function
   */
document.querySelector('form').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission

  // Get the entered username and password
  var username = document.getElementById('yourUsername').value;
  var password = document.getElementById('yourPassword').value;

  // Perform authentication check
  if (username === 'admin1' && password === 'Admin@123') {
    // Authentication successful, redirect to the dashboard page
    window.location.href = 'index.html';
  } else {
    // Authentication failed, display an error message
    var invalidFeedback = document.getElementsByClassName('invalid-feedback');
    for (var i = 0; i < invalidFeedback.length; i++) {
      invalidFeedback[i].style.display = 'block';
    }
  }
});

function formatCurrency(value) {
  const formatter = new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: 'AED',
    minimumFractionDigits: 0,
  });
  return formatter.format(value);
}

$(document).ready(function () {
  $('#showPasswordButton').click(function () {
    var passwordInput = $('#yourPassword');
    var passwordFieldType = passwordInput.attr('type');
    var eyeIcon = $('#eyeIcon');

    if (passwordFieldType === 'password') {
      passwordInput.attr('type', 'text');
      eyeIcon.removeClass('bi-eye-slash-fill').addClass('bi-eye-fill');
    } else {
      passwordInput.attr('type', 'password');
      eyeIcon.removeClass('bi-eye-fill').addClass('bi-eye-slash-fill');
    }
  });
});

/**
   * Whatsapp API function
   */
function openWhatsAppChat() {
  var phoneNumber = "+91 9946927980"; // Replace with your phone number
  var message = "Hello, I need help!"; // Replace with the default message

  // Construct the WhatsApp URL with the phone number and message
  var url = "https://api.whatsapp.com/send?phone=" + phoneNumber + "&text=" + encodeURIComponent(message);

  // Open the URL in a new window or tab
  window.open(url, "_blank");
}

/**
   * New Chat Bot function
   */
// Function to send a user message and receive a bot response
function sendMessage() {
  const userInput = document.getElementById("userInput").value;
  const chatBotMessagesElement = document.getElementById("chatBotMessages");

  // Display the user message
  chatBotMessagesElement.innerHTML += `<p><strong>User:</strong> ${userInput}</p>`;

  // Process the user message and generate a bot response
  const botResponse = generateBotResponse(userInput);

  // Display the bot response
  chatBotMessagesElement.innerHTML += `<p><strong>Chat Bot:</strong> ${botResponse}</p>`;

  // Clear the user input field
  document.getElementById("userInput").value = "";
}

// Function to generate a bot response based on the user input
function generateBotResponse(userInput) {
  // Convert user input to lowercase for easier comparison
  const userMessage = userInput.toLowerCase();

  // Define bot responses based on user input
  let botResponse = "";

  if (userMessage.includes("hello") || userMessage.includes("hi")) {
    botResponse = "Hello! How can I assist you today?";
  } else if (userMessage.includes("event")) {
    botResponse = "Sure! What kind of event are you planning?";
  } else if (userMessage.includes("catering")) {
    botResponse = "Great! Our catering services offer a variety of menu options. How many guests are you expecting?";
  } else if (userMessage.includes("venue")) {
    botResponse = "Certainly! We have a range of venues available. Could you please provide your preferred location?";
  } else {
    botResponse = "I'm sorry, I didn't understand. Can you please rephrase your message?";
  }

  return botResponse;
}

/**
   * Folloups and Reminders function
   */
// Sample data for follow-ups (replace with your own data)
const followUps = [
  {
    leadName: 'John Doe',
    contactDetails: 'john@example.com',
    subject: 'Follow-up 1',
    dateTime: '2023-07-05T14:30',
    priority: 'High'
  },
  {
    leadName: 'Jane Smith',
    contactDetails: 'jane@example.com',
    subject: 'Follow-up 2',
    dateTime: '2023-07-06T10:00',
    priority: 'Medium'
  }
];

// Function to add follow-up records to the table
function addFollowUpRecord(followUp) {
  const tableBody = document.querySelector('#followUpsTable tbody');
  const row = document.createElement('tr');

  row.innerHTML = `
    <td>${followUp.leadName}</td>
    <td>${followUp.contactDetails}</td>
    <td>${followUp.subject}</td>
    <td>${followUp.dateTime}</td>
    <td>${followUp.priority}</td>
    <td>
      <button type="button" class="btn btn-sm btn-primary">Edit</button>
      <button type="button" class="btn btn-sm btn-danger">Delete</button>
    </td>
  `;

  tableBody.appendChild(row);
}

// Function to populate follow-ups from data array
function populateFollowUps() {
  for (const followUp of followUps) {
    addFollowUpRecord(followUp);
  }
}

// Call the function to populate follow-ups on page load
populateFollowUps();

/**
   * Lead Conversion function
   */
// Sample data for converted leads (replace with your own data)
const convertedLeads = [
  {
    leadName: 'John Doe',
    contactDetails: 'john@example.com',
    company: 'ABC Corporation',
    email: 'john@abccorp.com',
    phone: '+1 123-456-7890',
    address: '123 Main St, City',
    converted: true
  },
  {
    leadName: 'Jane Smith',
    contactDetails: 'jane@example.com',
    company: 'XYZ Corporation',
    email: 'jane@xyzcorp.com',
    phone: '+1 987-654-3210',
    address: '456 Oak St, City',
    converted: true
  }
];

// Function to add converted lead records to the table
function addConvertedLeadRecord(lead) {
  const tableBody = document.querySelector('#leadConversionTable tbody');
  const row = document.createElement('tr');

  row.innerHTML = `
    <td>${lead.leadName}</td>
    <td>${lead.contactDetails}</td>
    <td>${lead.company}</td>
    <td>${lead.email}</td>
    <td>${lead.phone}</td>
    <td>${lead.address}</td>
    <td>${lead.converted ? 'Yes' : 'No'}</td>
    <td>
      <button type="button" class="btn btn-sm btn-primary">Edit</button>
      <button type="button" class="btn btn-sm btn-danger">Delete</button>
    </td>
  `;

  tableBody.appendChild(row);
}

// Function to populate converted leads from data array
function populateConvertedLeads() {
  for (const lead of convertedLeads) {
    addConvertedLeadRecord(lead);
  }
}

// Call the function to populate converted leads on page load
populateConvertedLeads();

/**
   * Event Details and Specifications function
   */
// Sample event data (replace with your own data)
const eventDetails = {
  eventName: 'Company Annual Party',
  eventDate: '2023-08-15',
  eventLocation: 'Grand Hall, City Center',
  eventOrganizer: 'ABC Events',
  eventCapacity: '200',
  eventDuration: '4 hours',
  eventEquipment: 'Sound system, Projector, Microphones',
  eventCatering: 'Buffet, Open bar'
};

// Function to populate event details on the page
function populateEventDetails() {
  document.getElementById('eventDate').textContent = eventDetails.eventDate;
  document.getElementById('eventLocation').textContent = eventDetails.eventLocation;
  document.getElementById('eventOrganizer').textContent = eventDetails.eventOrganizer;
  document.getElementById('eventCapacity').textContent = eventDetails.eventCapacity;
  document.getElementById('eventDuration').textContent = eventDetails.eventDuration;
  document.getElementById('eventEquipment').textContent = eventDetails.eventEquipment;
  document.getElementById('eventCatering').textContent = eventDetails.eventCatering;
}

// Call the function to populate event details on page load
populateEventDetails();





















document.addEventListener('DOMContentLoaded', function () {
  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth', // Display the calendar in month view by default
    events: [
      {
        title: 'Event 1',
        start: '2023-08-15',
        end: '2023-08-17'
      },
      {
        title: 'Event 2',
        start: '2023-08-20',
        end: '2023-08-22'
      },
      // Add more events as needed...
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    }
  });

  calendar.render();
});
