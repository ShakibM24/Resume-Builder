function generateResume() {
    // Personal details
    const firstName = document.querySelector('.firstname').value || '-';
    const middleName = document.querySelector('.middlename').value || '';
    const lastName = document.querySelector('.lastname').value || '-';
    const address = document.querySelector('.address').value || '-';
    const email = document.querySelector('.email').value || '-';
    const phoneNo = document.querySelector('.phoneno').value || '-';
    const summary = document.querySelector('.summary').value || '-';

    // Construct the full name and update the preview
    const fullName = `${firstName} ${middleName} ${lastName}`.trim();
    document.getElementById('fullname_dsp').textContent = fullName;
    document.getElementById('address_dsp').textContent = address;
    document.getElementById('email_dsp').textContent = email;
    document.getElementById('phoneno_dsp').textContent = phoneNo;
    document.getElementById('summary_dsp').textContent = summary;
}
document.addEventListener('DOMContentLoaded', function() {
    updateAchievements();
    updateExperience();
    updateEducation();
    updateProjects();
    updateSkills();

    // Set up additional event listeners if needed here
});


function previewImage() {
    const input = document.querySelector('.image');
    const imagePreview = document.getElementById('image_dsp');

    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block'; // Show the image preview
        };

        reader.readAsDataURL(input.files[0]);
    }
}

// Event listeners
document.getElementById('Resume-form').addEventListener('keyup', generateResume);
document.querySelector('.image').addEventListener('change', previewImage);

// Function for print button
function printResume() {
    window.print();
}

document.addEventListener('DOMContentLoaded', function() {
    // Initially populate achievements from existing inputs on page load
    updateAchievements();

    // Setup listener for the "Add Achievement" button
    document.querySelector('.repeater-add-btn').addEventListener('click', function() {
        addAchievement();
    });
});

function updateAchievements() {
    const achievementsDisplay = document.getElementById('achievements_dsp');
    achievementsDisplay.innerHTML = ''; // Clear the display area

    document.querySelectorAll('.Resume-form-row-achievement').forEach(achievement => {
        const title = achievement.querySelector('.achieve_title').value.trim();
        const description = achievement.querySelector('.achieve_description').value.trim();

        if (title || description) {
            const entry = document.createElement('div');
            entry.classList.add('achievement-entry');
            entry.innerHTML = `<strong>${title}</strong>: ${description}`;
            achievementsDisplay.appendChild(entry);
        }
    });
}

function addAchievement() {
    const container = document.getElementById('resume-achievements-section');
    const newAchievement = document.createElement('div');
    newAchievement.classList.add('Resume-form-row', 'Resume-form-row-achievement');
    newAchievement.innerHTML = `
        <div class="cols-2">
            <div class="form-elem">
                <label class="form-label">Title</label>
                <input type="text" class="form-control achieve_title" placeholder="Achievement Title" onkeyup="updateAchievements()">
            </div>
            <div class="form-elem">
                <label class="form-label">Description</label>
                <textarea class="form-control achieve_description" placeholder="Details" onkeyup="updateAchievements()"></textarea>
            </div>
        </div>
        <button type="button" class="repeater-remove-btn" onclick="removeAchievement(this)">Remove</button>
    `;
    container.appendChild(newAchievement);
}

function removeAchievement(button) {
    button.closest('.Resume-form-row-achievement').remove();
    updateAchievements(); // Update list after removal
}






function updateExperience() {
    const experiences = document.querySelectorAll('.exp_title');
    let experiencesHtml = '';

    experiences.forEach((experience, index) => {
        const title = experience.value;
        const company = document.querySelectorAll('.exp_organization')[index].value;
        const location = document.querySelectorAll('.exp_location')[index].value;
        const startDate = document.querySelectorAll('.exp_start_date')[index].value;
        const endDate = document.querySelectorAll('.exp_end_date')[index].value;
        const description = document.querySelectorAll('.exp_description')[index].value;

        if (title) {
            experiencesHtml += `<div><strong>${title}</strong> at ${company}, ${location} from ${startDate} to ${endDate}<br>${description}</div>`;
        }
    });

    document.getElementById('experiences_dsp').innerHTML = experiencesHtml;
}

function updateEducation() {
    const educations = document.querySelectorAll('.edu_school');
    let educationsHtml = '';

    educations.forEach((education, index) => {
        const school = education.value;
        const degree = document.querySelectorAll('.edu_degree')[index].value;
        const city = document.querySelectorAll('.edu_city')[index].value;
        const startDate = document.querySelectorAll('.edu_start_date')[index].value;
        const graduationDate = document.querySelectorAll('.edu_graduation_date')[index].value;
        const description = document.querySelectorAll('.edu_description')[index].value;

        if (school) {
            educationsHtml += `<div>${degree} from ${school}, ${city} from ${startDate} to ${graduationDate}<br>${description}</div>`;
        }
    });

    document.getElementById('educations_dsp').innerHTML = educationsHtml;
}

function updateProjects() {
    const projects = document.querySelectorAll('.proj_title');
    let projectsHtml = '';

    projects.forEach((project, index) => {
        const title = project.value;
        const link = document.querySelectorAll('.proj_link')[index].value;
        const description = document.querySelectorAll('.proj_description')[index].value;

        if (title) {
            projectsHtml += `<div><strong>${title}</strong>: ${description}<br>Link: ${link}</div>`;
        }
    });

    document.getElementById('projects_dsp').innerHTML = projectsHtml;
}

function updateSkills() {
    const skills = document.querySelectorAll('.skill');
    let skillsHtml = '';

    skills.forEach((skill) => {
        const skillName = skill.value;
        if (skillName) {
            skillsHtml += `<span>${skillName}</span><br>`;
        }
    });

    document.getElementById('skills_dsp').innerHTML = skillsHtml;
}

// Adding keyup event listener for all input fields that will update the corresponding sections
document.querySelectorAll('.achieve_title, .achieve_description').forEach(input => {
    input.addEventListener('keyup', updateAchievements);
});

document.querySelectorAll('.exp_title, .exp_organization, .exp_location, .exp_start_date, .exp_end_date, .exp_description').forEach(input => {
    input.addEventListener('keyup', updateExperience);
});

document.querySelectorAll('.edu_school, .edu_degree, .edu_city, .edu_start_date, .edu_graduation_date, .edu_description').forEach(input => {
    input.addEventListener('keyup', updateEducation);
});

document.querySelectorAll('.proj_title, .proj_link, .proj_description').forEach(input => {
    input.addEventListener('keyup', updateProjects);
});

document.querySelectorAll('.skill').forEach(input => {
    input.addEventListener('keyup', updateSkills);
});

// Initialize all sections on page load
document.addEventListener('DOMContentLoaded', function() {
    updateAchievements();
    updateExperience();
    updateEducation();
    updateProjects();
    updateSkills();
});
$(document).ready(function () {
    // Function to update all project entries
    function updateProjects() {
        const projectsContainer = $('#projects_dsp');
        projectsContainer.empty(); // Clear existing project entries
        
        $('.proj_title').each(function(index) {
            const title = $(this).val();
            const link = $('.proj_link').eq(index).val();
            const description = $('.proj_description').eq(index).val();

            if (title) {
                const projectHtml = `
                    <div class="project-entry">
                        <strong>Project:</strong> ${title}<br>
                        <strong>Description:</strong> ${description}<br>
                        <strong>Link:</strong> ${link}
                    </div>`;
                projectsContainer.append(projectHtml);
            }
        });
    }

    // Delegate events to the dynamically added elements using jQuery's on
    $(document).on('keyup', '.proj_title, .proj_link, .proj_description', updateProjects);

    // Initialize update functions on page load for already present data
    updateProjects();

    // Handling addition of new project entries
    $(document).on('click', '.repeater-add-btn', function() {
        const projectEntryHtml = `
            <div data-repeater-item class="Resume-form-row Resume-form-row-experience">
                <div class="cols-3">
                    <div class="form-elem">
                        <label class="form-label">Project Name</label>
                        <input type="text" class="form-control proj_title" onkeyup="updateProjects()">
                    </div>
                    <div class="form-elem">
                        <label class="form-label">Project link</label>
                        <input type="text" class="form-control proj_link" onkeyup="updateProjects()">
                    </div>
                    <div class="form-elem">
                        <label class="form-label">Description</label>
                        <input type="text" class="form-control proj_description" onkeyup="updateProjects()">
                    </div>
                </div>
                <button type="button" class="repeater-remove-btn" onclick="$(this).closest('[data-repeater-item]').remove(); updateProjects();">-</button>
            </div>`;
        
        $(this).before(projectEntryHtml);
    });

    // Print Resume
    $('.print-btn').on('click', function() {
        window.print();
    });
});
function addSkill() {
    const skillsContainer = document.getElementById('skillsList'); // The container where new skill inputs will be added

    // Create a new input for the skill with a remove button
    const newSkill = document.createElement('div');
    newSkill.classList.add('skill-entry');
    newSkill.innerHTML = `
        <input type="text" class="form-control skill" placeholder="Skill" onkeyup="updateSkills()">
        <button type="button" onclick="removeSkill(this)">Remove Skill</button>
    `;

    // Append the new skill input to the skills container
    skillsContainer.appendChild(newSkill);
}

function removeSkill(button) {
    // Remove the skill input
    button.parentElement.remove();
    updateSkills(); // Update the skills display on the resume
}

function updateSkills() {
    const skills = document.querySelectorAll('.skill'); // Get all skill inputs
    const resumeSkillsSection = document.getElementById('resume-skills-section'); // The area where skills will be displayed on the resume

    // Clear the current skills entries in the resume preview
    resumeSkillsSection.innerHTML = '';

    skills.forEach((skillInput) => {
        const skillValue = skillInput.value.trim();
        if (skillValue) {
            // Add each skill to the resume preview
            const skillEntry = document.createElement('div');
            skillEntry.textContent = skillValue;
            resumeSkillsSection.appendChild(skillEntry);
        }
    });
}

// Initialize the skills on the resume on document load
document.addEventListener('DOMContentLoaded', updateSkills);

function addExperience() {
    const experienceContainer = document.getElementById('experiences_dsp'); // This is where we will add the new experience

    // Create the HTML for the new experience entry
    const newExperience = document.createElement('div');
    newExperience.classList.add('experience-entry');
    newExperience.innerHTML = `
        <input type="text" class="form-control exp_title" placeholder="Job Title" onkeyup="updateExperiences()">
        <input type="text" class="form-control exp_organization" placeholder="Company / Organization" onkeyup="updateExperiences()">
        <input type="text" class="form-control exp_location" placeholder="Location" onkeyup="updateExperiences()">
        <input type="date" class="form-control exp_start_date" onchange="updateExperiences()">
        <input type="date" class="form-control exp_end_date" onchange="updateExperiences()">
        <textarea class="form-control exp_description" placeholder="Job Description" onkeyup="updateExperiences()"></textarea>
        <button type="button" onclick="removeExperience(this)">Remove Experience</button>
    `;

    // Append the new experience entry to the container
    experienceContainer.appendChild(newExperience);
}

function removeExperience(button) {
    // Remove the experience entry
    button.parentElement.remove();
    updateExperiences(); // Update the resume preview
}


function updateSkills() {
    const skillsContainer = $('#skills_dsp');
    skillsContainer.empty(); // Clear existing skills entries

    $('.skill').each(function() {
        const skill = $(this).val();
        if (skill) {
            skillsContainer.append(`<span><strong>${skill}</strong></span><br>`);
        }
    });
}
function updateExperiences() {
    const experiences = document.querySelectorAll('.experience-entry'); // Get all experience entries
    const resumeExperienceSection = document.getElementById('resume-experience-section'); // This is where experiences will be displayed on the resume

    // Clear the current experience entries in the resume preview
    resumeExperienceSection.innerHTML = '';

    experiences.forEach((exp) => {
        const title = exp.querySelector('.exp_title').value;
        const organization = exp.querySelector('.exp_organization').value;
        const location = exp.querySelector('.exp_location').value;
        const startDate = exp.querySelector('.exp_start_date').value;
        const endDate = exp.querySelector('.exp_end_date').value;
        const description = exp.querySelector('.exp_description').value;

        // Only add to the resume preview if the title and organization are provided
        if (title && organization) {
            const expPreviewEntry = document.createElement('div');
            expPreviewEntry.innerHTML = `
                <strong>${title}</strong> at ${organization}
                <br>${location} - ${startDate} to ${endDate}
                <p>${description}</p>
            `;

            // Append the new experience entry to the resume preview
            resumeExperienceSection.appendChild(expPreviewEntry);
        }
    });
}


