document.getElementById('cubicForm').addEventListener('submit', function (event) {
    event.preventDefault();

    let a = parseFloat(document.getElementById('a').value);
    let b = parseFloat(document.getElementById('b').value);
    let c = parseFloat(document.getElementById('c').value);
    let d = parseFloat(document.getElementById('d').value);

    let roots = solveCubic(a, b, c, d);
    displayResult(roots);
});

function solveCubic(a, b, c, d) {
    // Finding the roots of a cubic equation using the general solution
    if (a === 0) {
        return solveQuadratic(b, c, d);
    }

    b /= a;
    c /= a;
    d /= a;

    let p = (3 * c - b * b) / 3;
    let q = (2 * b * b * b - 9 * b * c + 27 * d) / 27;
    let delta = q * q / 4 + p * p * p / 27;

    let roots = [];
    if (delta > 0) {
        let u = Math.cbrt(-q / 2 + Math.sqrt(delta));
        let v = Math.cbrt(-q / 2 - Math.sqrt(delta));
        roots.push(u + v - b / 3);
        roots.push((-u - v) / 2 - b / 3 + ' + ' + Math.sqrt(3) * (u - v) / 2 + 'i');
        roots.push((-u - v) / 2 - b / 3 + ' - ' + Math.sqrt(3) * (u - v) / 2 + 'i');
    } else if (delta === 0) {
        let u = Math.cbrt(-q / 2);
        roots.push(2 * u - b / 3);
        roots.push(-u - b / 3);
    } else {
        let r = Math.sqrt(-p * p * p / 27);
        let phi = Math.acos(-q / (2 * r));
        r = Math.cbrt(r);
        roots.push(2 * r * Math.cos(phi / 3) - b / 3);
        roots.push(2 * r * Math.cos((phi + 2 * Math.PI) / 3) - b / 3);
        roots.push(2 * r * Math.cos((phi + 4 * Math.PI) / 3) - b / 3);
    }

    return roots;
}

function solveQuadratic(a, b, c) {
    // Solving quadratic equation for degenerate cases
    let delta = b * b - 4 * a * c;
    if (delta > 0) {
        let root1 = (-b + Math.sqrt(delta)) / (2 * a);
        let root2 = (-b - Math.sqrt(delta)) / (2 * a);
        return [root1, root2];
    } else if (delta === 0) {
        let root1 = -b / (2 * a);
        return [root1];
    } else {
        let realPart = -b / (2 * a);
        let imaginaryPart = Math.sqrt(-delta) / (2 * a);
        return [
            realPart + ' + ' + imaginaryPart + 'i',
            realPart + ' - ' + imaginaryPart + 'i'
        ];
    }
}

function displayResult(roots) {
    let resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';

    resultDiv.innerHTML = 'Roots: <br>' + roots.join('<br>');
}
