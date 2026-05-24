function getScale(finalGrade) {
  if (finalGrade >= 90) return "1.0";
  if (finalGrade >= 80) return "2.0";
  if (finalGrade >= 70) return "3.0";
  if (finalGrade >= 50) return "4.0";
  return "0.0";
}
function addElements(){
    let numRows = document.querySelector("#numRows").value;
    if (numRows > 0){
        for (let i = 0; i < numRows; i++) addElement();
    }
}
function addElement() {
    let tr = document.createElement("tr");
        tr.innerHTML = `
            <td><input type="text" class="student-name"></td>
            <td><input type="number" class="activity-grade" value="0" min="0"></td>
            <td><input type="number" class="exam-grade" value="0" min="0"></td>
            <td class="final-grade">0.00</td>
            <td class="scale-grade">0.0</td> `;

        let table = document.querySelector("#GradeTable");
        table.appendChild(tr);

        let InName = tr.querySelector(".student-name");
        let inAct = tr.querySelector(".activity-grade");
        let inExam = tr.querySelector(".exam-grade");
        let inFGrade = tr.querySelector(".final-grade");
        let inSCale = tr.querySelector(".scale-grade");

        InName.addEventListener("input", function (e) {
          UpdateFinal(tr);
        });
        inAct.addEventListener("input", function (e) {
          UpdateFinal(tr);
        });
        inExam.addEventListener("input", function (e) {
          UpdateFinal(tr);
        });
}

function UpdateFinal(tr) {
    let actGrade  = parseFloat(tr.querySelector(".activity-grade").value) || 0;
    let examGrade = parseFloat(tr.querySelector(".exam-grade").value) || 0;
    let finalGrade = (actGrade * 0.4) + (examGrade * 0.6);
    let finalCell = tr.querySelector(".final-grade");
    let scaleCell = tr.querySelector(".scale-grade");

    finalCell.innerHTML = finalGrade.toFixed(2);
    scaleCell.innerHTML = getScale(finalGrade);

    UpdateSummary();
}

function UpdateSummary() {
    let rows = document.querySelectorAll("#GradeTable tr");
    
    let total = 0;
    let totalStudents = 0;

    rows.forEach(function(tr) {
        let finalCell = tr.querySelector(".final-grade");

        if (finalCell) {
            total += parseFloat(finalCell.textContent) || 0;
            totalStudents++;
        }
    });

    let classAverage = totalStudents > 0 ? total / totalStudents : 0;

    document.querySelector(".TotalStudents").innerHTML =
        "Total Students: " + totalStudents;

    document.querySelector(".ClassAverage").innerHTML =
        "Class Average: " + classAverage.toFixed(2);
}