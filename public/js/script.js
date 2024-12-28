


let personalInfo = {};
let educationInfo = {};


function checkPersonalInfoFields() {
    const fname = document.getElementById('fname').value;
    const mname = document.getElementById('mname').value;
    const lname = document.getElementById('lname').value;
    const position = document.getElementById('position').value;
    const contact = document.getElementById('contact').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const objective = document.getElementById('Objective').value;

    const saveNextBtn = document.getElementById('save-next-btn');


    if (fname  && lname && position && contact && email && address  && objective) {
       
        saveNextBtn.disabled = false;
       
    } else {
        saveNextBtn.disabled = true;
    }
}



function savePersonalInfo() {
    
    personalInfo.firstName = document.getElementById('fname').value;
    personalInfo.middleName = document.getElementById('mname').value;
    personalInfo.lastName = document.getElementById('lname').value;
    personalInfo.position = document.getElementById('position').value;
    personalInfo.contact = document.getElementById('contact').value;
    personalInfo.email = document.getElementById('email').value;
    personalInfo.address = document.getElementById('address').value;
    personalInfo.objective = document.getElementById('Objective').value;

   
    document.getElementById('personal-info').classList.add('hidden');
    document.getElementById('education-info').classList.remove('hidden');
}


document.getElementById('fname').addEventListener('input', checkPersonalInfoFields);
document.getElementById('mname').addEventListener('input', checkPersonalInfoFields);
document.getElementById('lname').addEventListener('input', checkPersonalInfoFields);
document.getElementById('position').addEventListener('input', checkPersonalInfoFields);
document.getElementById('contact').addEventListener('input', checkPersonalInfoFields);
document.getElementById('email').addEventListener('input', checkPersonalInfoFields);
document.getElementById('address').addEventListener('input', checkPersonalInfoFields);
document.getElementById('Objective').addEventListener('input', checkPersonalInfoFields);






function checkEducationFields() {
    const educationEntries = document.querySelectorAll('.education-entry');
    const saveEducationBtn = document.getElementById('save-education-btn');
   
   
    const lastEntry = educationEntries[educationEntries.length - 1];
    const clgName = lastEntry.querySelector('.clg-name').value;
    const course = lastEntry.querySelector('.course').value;
    const percentage = lastEntry.querySelector('.percentage').value;
    const session = lastEntry.querySelector('.session').value;

    saveEducationBtn.disabled = !(clgName && course && percentage && session);
}


function addEducation() {
    const educationFieldsContainer = document.getElementById('education-fields');


    const newEntry = document.createElement('div');
    newEntry.classList.add('education-entry','columns-4');

    newEntry.innerHTML = `
        <label for="" class="form-label">Institute Name</label>
        <input type="text" class="clg-name border border-gray-400 p-2 mb-4 w-full" placeholder="Institute Name" required oninput="checkEducationFields()">

        <label for="" class="form-label">Degree</label>
        <input type="text" class="course border border-gray-400 p-2 mb-4 w-full" placeholder="Course Name" required oninput="checkEducationFields()">

        <label for="" class="form-label">Percentage</label>
        <input type="number" class="percentage border border-gray-400 p-2 mb-4 w-full" placeholder="Percentage/CGPA" required oninput="checkEducationFields()">

        <label for="" class="form-label">Session</label>
        <input type="text" class="session border border-gray-400 p-2 mb-4 w-full" placeholder="Session" required oninput="checkEducationFields()">
    `;

  
    educationFieldsContainer.appendChild(newEntry);


    newEntry.querySelector('.clg-name').addEventListener('input', checkEducationFields);
    newEntry.querySelector('.course').addEventListener('input', checkEducationFields);
    newEntry.querySelector('.percentage').addEventListener('input', checkEducationFields);
    newEntry.querySelector('.session').addEventListener('input', checkEducationFields);
}


function clearEducationFields() {
    document.getElementById('clg-name').value = '';
    document.getElementById('course').value = '';
    document.getElementById('percentage').value = '';
    document.getElementById('session').value = '';
}


function backToPrevious() {
  
    document.getElementById('education-info').classList.add('hidden');
    document.getElementById('personal-info').classList.remove('hidden');
}

function saveEducationInfo() {
 
    document.getElementById('education-info').classList.add('hidden');
    document.getElementById('experience-info').classList.remove('hidden');
}



let experiences = [];

function addExperience() {
    const experienceFields = document.getElementById('experience-list');
    const newEntry = document.createElement('div');
    newEntry.classList.add('experience-entry', 'mb-4');
    newEntry.innerHTML = `
        <label for="comp-name">Company Name</label>
        <input type="text" class="comp-name border border-gray-400 p-2 mb-4 w-full" placeholder="Company Name" required>

        <label for="position">Designation</label>
        <input type="text" class="position border border-gray-400 p-2 mb-4 w-full" placeholder="Designation" required>

        <label for="from">Joining Date</label>
        <input type="date" class="from border border-gray-400 p-2 mb-4 w-full" required>

        <label for="ending">Ending Date</label>
        <input type="date" class="ending border border-gray-400 p-2 mb-4 w-full"   >

        

        <textarea class="experience border border-gray-400 p-2 mb-4 w-full" placeholder="Your Experience" rows="4" required></textarea>
        
        <button type="button" onclick="removeExperience(this)" class="bg-red-500 text-white p-2 rounded w-20 mb-6">Remove</button>
    `;

    experienceFields.appendChild(newEntry);
}



function removeExperience(button) {
    const experienceItem = button.parentElement;
    experienceItem.remove();
}

function saveAndNext() {
  


    document.getElementById('experience-info').classList.add('hidden');
    document.getElementById('skills-info').classList.remove('hidden');
}

function goBack() {
    document.getElementById('experience-info').classList.add('hidden');
    document.getElementById('education-info').classList.remove('hidden');
}



function addSkills() {
    const skillsFields = document.getElementById('skills-list');
    const newEntry = document.createElement('div');
    newEntry.classList.add('skill-entry', 'mb-4');

    newEntry.innerHTML = `
       
        <input type="text" class="skill-name border border-gray-400 p-2 mb-4 w-full" placeholder="Skill Name" required>

        <button type="button" onclick="removeSkill(this)" class="bg-red-500 text-white p-2 rounded w-20 mb-6">Remove</button>
    `;

    skillsFields.appendChild(newEntry);
}

function removeSkill(button) {
    const skillEntry = button.parentElement;
    skillEntry.remove();
}



function toPriviouspage() {
    document.getElementById('skills-info').classList.add('hidden');
    document.getElementById('experience-info').classList.remove('hidden');
}


function saveSkills() {
    
    document.getElementById('skills-info').classList.add('hidden');
    document.getElementById('projects-info').classList.remove('hidden');
}





function addProject() {
    const projectsFields = document.getElementById('projects-list');
    const newEntry = document.createElement('div');
    newEntry.classList.add('project-entry', 'mb-4');

    newEntry.innerHTML = `
        <label for="project-name">Project Name</label>
        <input type="text" class="project-name border border-gray-400 p-2 mb-4 w-full" placeholder="Project Name" required>

        <label for="project-description">Project Description</label>
        <textarea class="project-description border border-gray-400 p-2 mb-4 w-full" placeholder="Project Description" rows="4" required></textarea>

        <label for="project-link">Project Link</label>
        <input type="url" class="project-link border border-gray-400 p-2 mb-4 w-full" placeholder="Project Link (optional)">

        <button type="button" onclick="removeProject(this)" class="bg-red-500 text-white p-2 rounded w-20 mb-6">Remove</button>
    `;

    projectsFields.appendChild(newEntry);
}

function removeProject(button) {
    const projectEntry = button.parentElement;
    projectEntry.remove();
}

function toback() {
    document.getElementById('projects-info').classList.add('hidden');
    document.getElementById('skills-info').classList.remove('hidden');
}


function saveProjects(){
    document.getElementById('projects-info').classList.add('hidden');
    document.getElementById('achievements-info').classList.remove('hidden');
}





function addAchievement() {
    const achievementsFields = document.getElementById('achievements-list');
    const newEntry = document.createElement('div');
    newEntry.classList.add('achievement-entry', 'mb-4');

    newEntry.innerHTML = `
        <label for="achievement-title">Achievement Title</label>
        <input type="text" class="achievement-title border border-gray-400 p-2 mb-4 w-full" placeholder="Achievement Title" required>

        <label for="achievement-description">Achievement Description</label>
        <textarea class="achievement-description border border-gray-400 p-2 mb-4 w-full" placeholder="Achievement Description" rows="4" required></textarea>

        <button type="button" onclick="removeAchievement(this)" class="bg-red-500 text-white p-2 rounded w-20 mb-6">Remove</button>
    `;

    achievementsFields.appendChild(newEntry);
}

function removeAchievement(button) {
    const achievementEntry = button.parentElement;
    achievementEntry.remove();
}

function goToPriviousPage(){
    document.getElementById('achievements-info').classList.add('hidden');
    document.getElementById('projects-info').classList.remove('hidden'); 
}



 const generateResumeBtn = document.getElementById('generate-resume-btn');
 if (generateResumeBtn) {
     generateResumeBtn.addEventListener('click', generateResume);
 } else {
     console.error("Button with ID 'generate-resume-btn' not found.");
 }



function generateResume() {
    
    const fname = document.getElementById('fname').value;
    const mname = document.getElementById('mname').value;
    const lname = document.getElementById('lname').value;
    const position = document.getElementById('position').value;
    const contact = document.getElementById('contact').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value; 
    const summary = document.getElementById('Objective').value;

   
    document.getElementById('preview-name').innerText = `${fname} ${mname} ${lname}`;
    document.getElementById('preview-Deg').innerText =  position;
    document.getElementById('preview-email').innerText = `Email: ${email}`;
    document.getElementById('preview-contact').innerText = `Contact: ${contact}`;
    document.getElementById('preview-address').innerText = `Address: ${address}`;
    document.getElementById('preview-summary').innerText = summary;


    const educationEntries = document.querySelectorAll('.education-entry');
    const educationPreview = document.querySelector('.education-info-preview');
    educationPreview.innerHTML = ' <h4 class="font-semibold mt-4 bg-teal-500  text-white text-center">Education</h4>'; 

    educationEntries.forEach(entry => {
        const clgName = entry.querySelector('.clg-name').value;
        const degree = entry.querySelector('.course').value;
        const percentage = entry.querySelector('.percentage').value;
        const session = entry.querySelector('.session').value;


        educationPreview.innerHTML += `
            <p>Institute: ${clgName}</p>
            <p>Degree: ${degree}</p>
            <p>Percentage: ${percentage}</p>
            <p>Session: ${session}</p>
        `;
    });

   
    const experienceEntries = document.querySelectorAll('.experience-entry');
    const experiencePreview = document.querySelector('.exprience-info-preview');
    experiencePreview.innerHTML = '<h4 class="font-semibold mt-4 bg-teal-500  text-white text-center">Experience</h4>'; 

    experienceEntries.forEach(entry => {
        const companyName = entry.querySelector('.comp-name').value;
        const designation = entry.querySelector('.position').value;
        const fromDate = entry.querySelector('.from').value;
        const toDate = entry.querySelector('.ending').value;
        const description = entry.querySelector('.experience').value;

      
        experiencePreview.innerHTML += `
            <p>Company: ${companyName}</p>
            <p>Designation: ${designation}</p>
            <p>From: ${fromDate} To: ${toDate}</p>
            <p>Description: ${description}</p>
        `;
    });

 
    const skillEntries = document.querySelectorAll('.skill-entry .skill-name');
    const skillsPreview = document.querySelector('.skills-info-preview');
    skillsPreview.innerHTML = '<h4 class="font-semibold mt-4 bg-teal-500 text-white text-center">Skills</h4>'; 

    skillEntries.forEach(skill => {
        skillsPreview.innerHTML += `<p>${skill.value}</p>`;
    });

  
    const projectEntries = document.querySelectorAll('.project-entry');
    const projectsPreview = document.querySelector('.project-info-preview');
    projectsPreview.innerHTML = ' <h4 class="font-semibold mt-4 bg-teal-500 text-white text-center">Projects</h4>'; 

    projectEntries.forEach(project => {
        const projectName = project.querySelector('.project-name').value;
        const projectDescription = project.querySelector('.project-description').value;
        const projectLink = project.querySelector('.project-link').value;

 
        projectsPreview.innerHTML += `
            <p>Project Name: ${projectName}</p>
            <p>Description: ${projectDescription}</p>
            <p>Link: ${projectLink}</p>
        `;
    });

   
    const achievementEntries = document.querySelectorAll('.achievement-entry');
    const achievementsPreview = document.querySelector('.achivement-info-preview');
    achievementsPreview.innerHTML = '<h4 class="font-semibold mt-4 bg-teal-500 text-white text-center">Achivement</h4>'; 

    achievementEntries.forEach(achievement => {
        const title = achievement.querySelector('.achievement-title').value;
        const description = achievement.querySelector('.achievement-description').value;

       
        achievementsPreview.innerHTML += `
            <p>Title: ${title}</p>
            <p>Description: ${description}</p>
        `;
    });

    
   
    document.getElementById('achievements-info').classList.add('hidden');
    document.getElementById('resume-preview').classList.remove('hidden');
    document.getElementById('job-suggestions-info').classList.remove('hidden');
}


function printResume() {
    window.print();
}



function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

  
    const name = document.getElementById('preview-name').innerText;
    const degree = document.getElementById('preview-Deg').innerText;
    const email = document.getElementById('preview-email').innerText;
    const contact = document.getElementById('preview-contact').innerText;
    const address = document.getElementById('preview-address').innerText;
    const summary = document.getElementById('preview-summary').innerText;

  
    let content = `Name: ${name}\n`;
    content += `Degree: ${degree}\n`;
    content += `${email}\n`;
    content += `${contact}\n`;
    content += `${address}\n\n`;
    content += `Objective: ${summary}\n\n`;


    const educationPreview = document.querySelector('.education-info-preview');
    content += educationPreview.innerText + '\n\n';

 
    const experiencePreview = document.querySelector('.exprience-info-preview');
    content += experiencePreview.innerText + '\n\n';

  
    const skillsPreview = document.querySelector('.skills-info-preview');
    content += skillsPreview.innerText + '\n\n';
    const projectsPreview = document.querySelector('.project-info-preview');
    content += projectsPreview.innerText + '\n\n';
    const achievementsPreview = document.querySelector('.achivement-info-preview');
    content += achievementsPreview.innerText + '\n\n';
    doc.text(content, 10, 10);
    doc.save('resume.pdf');
}

