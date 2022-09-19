function sendUpperBy(vertices, up)
{
    for (let i = 0; i < vertices.length; i++) {
        if (i % 2 != 0)
        {
            vertices[i] += up;
        }
    } 
}

function sendLeftBy(vertices, left)
{
    for (let i = 0; i < vertices.length; i++) {
        if (i % 2 == 0)
        {
            vertices[i] -= left;
        }
    } 
}

function main() 
{
    var kanvas = document.getElementById("kanvas");
    var gl = kanvas.getContext("webgl");

    // creating base for digits
    var vertices = [
        // top horizontal bit
        -0.78, 0.55,
        -0.8, 0.6, 
        -0.78, 0.65,

        -0.5, 0.65,
        -0.48, 0.6,
        -0.5, 0.55,

        // top left vertical bit
        -0.79, 0.5,
        -0.815, 0.55,
        -0.840, 0.5,

        -0.840, 0,
        -0.815, -0.05,
        -0.79, 0,

        // top right vertical bit
        -0.49, 0.5,
        -0.465, 0.55,
        -0.44, 0.5,

        -0.44, 0,
        -0.465, -0.05,
        -0.49, 0,

        // middle horizontal bit
        -0.78, -0.05,
        -0.8, -0.1, 
        -0.78, -0.15,

        -0.5, -0.15,
        -0.48, -0.1,
        -0.5, -0.05,

        // bottom left vertical bit
        -0.79, -0.7,
        -0.815, -0.75,
        -0.840, -0.7,

        -0.840, -0.2,
        -0.815, -0.15,
        -0.79, -0.2,

        // bottom right vertical bit
        -0.44, -0.7,
        -0.465, -0.75,
        -0.49, -0.7,

        -0.49, -0.2,
        -0.465, -0.15,
        -0.44, -0.2,

        // bottom horizontal bit
        -0.78, -0.75,
        -0.8, -0.8, 
        -0.78, -0.85,

        -0.5, -0.85,
        -0.48, -0.8,
        -0.5, -0.75,

        // top middle vertical bit
        -0.615, 0.5,
        -0.64, 0.55,
        -0.665, 0.5,

        -0.665, 0,
        -0.64, -0.05,
        -0.615, 0,

        // bottom middle vertical bit
        -0.615, -0.7,
        -0.64, -0.75,
        -0.665, -0.7,

        -0.665, -0.2,
        -0.64, -0.15,
        -0.615, -0.2,

        // top half left horizontal bit
        -0.605, 0.55,
        -0.625, 0.6, 
        -0.605, 0.65,

        -0.5, 0.65,
        -0.48, 0.6,
        -0.5, 0.55,

        // top half right horizontal bit
        -0.78, 0.55,
        -0.8, 0.6, 
        -0.78, 0.65,

        -0.675, 0.65,
        -0.655, 0.6,
        -0.675, 0.55,
    ];

    // readjusting the position
    sendUpperBy(vertices, 0.125);
    sendLeftBy(vertices, 0.082);

    // jarak tiap digit
    var distance = 0.48;

    // adding 3 other base
    // 
    // for (let i = 0; i < 3; i++)
    // {
    //     addBase(vertices, i, distance);
    // }

    // pindahin vertices ke GPU dari CPU
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Vertex Shader
    var vertexShaderCode = /* yang akan ditulis di dalam sini adalah source code .glsl */
    `
    attribute vec2 aPosition;
    uniform float digitPosVtx;
    uniform bool isBack;
    
    void main()
    {
        float x;
        float y; 

        if (isBack)
        {
            x = aPosition.x + (`+distance+` * digitPosVtx);
            y = aPosition.y;
        }
        else
        {
            x = aPosition.x + (`+distance+` * digitPosVtx);
            y = aPosition.y;
        }

        gl_Position =  vec4(x, y, 0.0, 1.0); 
    }
    `;

    var redBack = [59, 54, 59, 42];
    var greenBack = [28, 36, 46, 41];
    var blueBack = [26, 26, 27, 24];

    var redFront = [243, 240, 241, 244];
    var greenFront = [17, 78, 135, 194];
    var blueFront = [19, 14, 13, 19];

    // Fragment Shader
    var fragmentShaderCode = `
    precision mediump float;
    uniform bool digitPosInd1;
    uniform bool digitPosInd2;
    uniform bool isBack;  

    void main()
    {
        float r;
        float g;
        float b;

        if (isBack)
        {
            if (digitPosInd1)
            {
                if(digitPosInd2)
                {
                    r = `+redBack[3]/255+`;
                    g = `+greenBack[3]/255+`;
                    b = `+blueBack[3]/255+`;
                }
                else 
                {
                    r = `+redBack[2]/255+`;
                    g = `+greenBack[2]/255+`;
                    b = `+blueBack[2]/255+`;
                }
            }
            else {
                if(digitPosInd2)
                {
                    r = `+redBack[1]/255+`;
                    g = `+greenBack[1]/255+`;
                    b = `+blueBack[1]/255+`;
                }
                else
                {
                    r = `+redBack[0]/255+`;
                    g = `+greenBack[0]/255+`;
                    b = `+blueBack[0]/255+`;
                }
            }
        }
        else 
        {
            if (digitPosInd1)
            {
                if(digitPosInd2)
                {
                    r = `+redFront[3]/255+`;
                    g = `+greenFront[3]/255+`;
                    b = `+blueFront[3]/255+`;
                }
                else 
                {
                    r = `+redFront[2]/255+`;
                    g = `+greenFront[2]/255+`;
                    b = `+blueFront[2]/255+`;
                }
            }
            else {
                if(digitPosInd2)
                {
                    r = `+redFront[1]/255+`;
                    g = `+greenFront[1]/255+`;
                    b = `+blueFront[1]/255+`;
                }
                else
                {
                    r = `+redFront[0]/255+`;
                    g = `+greenFront[0]/255+`;
                    b = `+blueFront[0]/255+`;
                }
            }
        }

        gl_FragColor = vec4(r, g, b, 1.0);
    }
    `;

    var vertexShaderObject = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShaderObject, vertexShaderCode);
    gl.compileShader(vertexShaderObject);

    var fragmentShaderObject = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShaderObject, fragmentShaderCode);
    gl.compileShader(fragmentShaderObject);

    var shaderProgram = gl.createProgram(); 
    gl.attachShader(shaderProgram, vertexShaderObject);
    gl.attachShader(shaderProgram, fragmentShaderObject);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    // Mengajari GPU bagaimana cara mengoleksi nilai 
    // posisi dari ARRAY_BUFFER untuk setiap vertex
    // yang sedang diproses
    var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    let digitLocVtx = gl.getUniformLocation(shaderProgram, "digitPosVtx");
    let digitPosInd1 = gl.getUniformLocation(shaderProgram, "digitPosInd1");
    let digitPosInd2 = gl.getUniformLocation(shaderProgram, "digitPosInd2");
    let zLocation = gl.getUniformLocation(shaderProgram, "isBack");

    gl.clearColor(0.0, 0.0, 0.0, 1.0); // values of red, green, blue, alpha
    gl.clear(gl.COLOR_BUFFER_BIT);

    for(let k = 0; k < 2; k++)
    {
        gl.uniform1f(zLocation, (k == 0) ? true : false);
        for(let i = 0; i < 4; i ++){
            gl.uniform1f(digitLocVtx, i);
            gl.uniform1f(digitPosInd1, (i < 2) ? true : false);
            gl.uniform1f(digitPosInd2, (i % 2 == 0) ? true : false);

            if(k == 0)
            {
                for (let j = 0; j < 7; j++)
                {
                    gl.drawArrays(gl.TRIANGLE_FAN, j*6, 6);
                }
            }
            else 
            {
                if (i < 2)
                {
                    for (let j = 0; j < 7; j++)
                    {
                        if (j != 1 && j != 4) gl.drawArrays(gl.LINE_LOOP, j*6, 6);
                    }
                }
                else 
                {
                    if (i % 2 == 0)
                    {
                        for (let j = 7; j < 11; j++)
                        {
                            gl.drawArrays(gl.TRIANGLE_FAN, j*6, 6);
                        }
                    }
                    else
                    {
                        for (let j = 0; j < 7; j++)
                        {
                            if (j == 2 || j == 5) gl.drawArrays(gl.TRIANGLE_FAN, j*6, 6);
                        }
                    }

                }
                
            }
        } 
    }
    
}