(()=>{"use strict";class t{constructor(t,e,s,i){this.title=t,this.description=e,this.dueDate=s,this.priority=i,this.completed=!1}}const e=document.getElementById("taskForm"),s=document.getElementById("taskContainer"),i=new class{constructor(){this.tasks=function(){const t=localStorage.getItem("tasks");return t?JSON.parse(t):[]}()}addTask(e,s,i,a){const n=new t(e,s,i,a);this.tasks.push(n),this.saveTasksToLocalStorage()}getTasks(){return this.tasks}getTask(t){return this.tasks[t]}editTask(t,e){Object.assign(this.tasks[t],e),this.saveTasksToLocalStorage()}removeTask(t){this.tasks.splice(t,1),this.saveTasksToLocalStorage()}markAsComplete(t){this.tasks[t].completed=!0,this.saveTasksToLocalStorage()}saveTasksToLocalStorage(){var t;t=this.tasks,localStorage.setItem("tasks",JSON.stringify(t))}};function a(){s.innerHTML="",i.getTasks().forEach(((t,e)=>{const i=document.createElement("div");i.classList.add("task-card"),t.completed&&i.classList.add("completed"),i.innerHTML=`\n            <h2>${t.title}</h2>\n            <p>${t.description}</p>\n            <p>Due Date: ${t.dueDate}</p>\n            <p>Priority: ${t.priority}</p>\n            ${t.completed?'<p>Completed</p> <button class="remove-btn" data-index="${index}">Remove</button>':`\n              \n                  <button class="edit-btn" data-index="${e}">Edit</button>\n                  <button class="remove-btn" data-index="${e}">Remove</button>\n                  <button class="complete-btn" data-index="${e}">Mark as Complete</button>\n                `}\n        `,s.appendChild(i)}))}a(),e.addEventListener("submit",(t=>{t.preventDefault();const s=document.getElementById("title").value,n=document.getElementById("description").value,o=document.getElementById("dueDate").value,d=document.getElementById("priority").value;i.addTask(s,n,o,d),e.reset(),a()})),s.addEventListener("click",(t=>{if(t.target.classList.contains("edit-btn")){const e=t.target.getAttribute("data-index"),a=function(t,e){const s=document.createElement("div");return s.classList.add("task-card"),s.innerHTML=`\n        <input type="text" id="editTitle" value="${t.title}" required>\n        <input type="text" id="editDescription" value="${t.description}">\n        <input type="date" id="editDueDate" value="${t.dueDate}" required>\n        <select id="editPriority">\n            <option value="low" ${"low"===t.priority?"selected":""}>Low</option>\n            <option value="medium" ${"medium"===t.priority?"selected":""}>Medium</option>\n            <option value="high" ${"high"===t.priority?"selected":""}>High</option>\n        </select>\n        <button class="save-edit-btn" data-index="${e}">Save</button>\n    `,s}(i.getTask(e),e);s.replaceChild(a,s.childNodes[e])}else if(t.target.classList.contains("remove-btn")){const e=t.target.getAttribute("data-index");i.removeTask(e),a()}else if(t.target.classList.contains("complete-btn")){const e=t.target.getAttribute("data-index");i.markAsComplete(e),a()}})),s.addEventListener("click",(t=>{if(t.target.classList.contains("save-edit-btn")){const e=t.target.getAttribute("data-index"),s=document.getElementById("editTitle").value,n=document.getElementById("editDescription").value,o=document.getElementById("editDueDate").value,d=document.getElementById("editPriority").value;i.editTask(e,{title:s,description:n,dueDate:o,priority:d}),a()}}))})();