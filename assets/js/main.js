/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 

/*===== SKILLS MODAL =====*/

const skillsMore = document.getElementById('skills-more');
const skillsModal = document.getElementById('skills-modal');
const skillsModalClose = document.getElementById('skills-modal-close');

if (skillsMore && skillsModal && skillsModalClose) {

    skillsMore.addEventListener('click', () => {
        skillsModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    skillsModalClose.addEventListener('click', () => {
        skillsModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    skillsModal.addEventListener('click', (event) => {
        if (event.target === skillsModal) {
            skillsModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

}

/*===== PROJECT MODAL =====*/

const projectButtons = document.querySelectorAll('[data-project]');
const projectModals = document.querySelectorAll('.work-modal');
const closeModalButtons = document.querySelectorAll('[data-close-modal]');

projectButtons.forEach((button) => {

    button.addEventListener('click', () => {

        const project = button.dataset.project;
        const modal = document.getElementById(`modal-${project}`);

        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

    });

});


closeModalButtons.forEach((button) => {

    button.addEventListener('click', () => {

        const modal = button.closest('.work-modal');

        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }

    });

});


projectModals.forEach((modal) => {

    modal.addEventListener('click', (event) => {

        if (event.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }

    });

});

document.addEventListener('keydown', (event) => {

    if (event.key === 'Escape') {

        projectModals.forEach((modal) => {
            modal.classList.remove('active');
        });

        document.body.style.overflow = '';
    }

});

/*===== EMAILJS =====*/

emailjs.init({
    publicKey: 'rFocP-EGWokTypRn4'
});

const contactForm = document.getElementById('contact-form');
const contactMessage = document.getElementById('contact-message');

if (contactForm) {

    contactForm.addEventListener('submit', function (event) {

        event.preventDefault();

        const submitButton = contactForm.querySelector(
            'input[type="submit"]'
        );

        submitButton.disabled = true;
        submitButton.value = 'Sending...';

        contactMessage.textContent = '';
        contactMessage.className = 'contact__message';

        emailjs.sendForm(
            'service_1yi0cpd',
            'template_n1divad',
            contactForm
        )
        .then(() => {

            contactMessage.textContent =
                'Message sent successfully!';

            contactMessage.classList.add(
                'contact__message',
                'success',
                'show'
            );

            contactForm.reset();

            submitButton.disabled = false;
            submitButton.value = 'Send Message';

        })
        .catch((error) => {

            console.error('EmailJS Error:', error);

            contactMessage.textContent =
                'Failed to send message. Please try again.';

            contactMessage.classList.add(
                'contact__message',
                'error',
                'show'
            );

            submitButton.disabled = false;
            submitButton.value = 'Send Message';

        });

    });

}
