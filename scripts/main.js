var compound_transform;

// automatically called whenever any transform changes
function CalculateCompoundTransform(transforms) {
    // matrices in `transforms[i].mat4x4`
    // note `transform[0]` is first tranform to apply to vertex
    
    // if only one transform, set compound transform eequal to it
    // otherwise multiply all matrices together (in proper order)
    // `compound_transform = Matrix.multiply(...)`
    var tranform_matrices = [];
    
    compound_transform = new Matrix(4, 4);

    var m;
    if(transforms.length == 1) { // runs if only 1 matrix
        compound_transform = transforms[0].mat4x4;
    } else {
        for(m = transforms.length-1; m >= 0; m--) { // runs through transforms and adds matrices to transform_matrices array
            tranform_matrices.push(transforms[m].mat4x4);
        }
        compound_transform = Matrix.multiply(tranform_matrices); // sets compound_transform to result of multiplication
    }

    return compound_transform;
}

// automatically called whenever compound transform changes
function CalculateTransformedVertex(vertex) {
    // multiple vertex by compound_transform
    // `final_vertex = Matrix.multiply(...)`
    var final_vertex = new Vector(4); // change / remove this

    console.log(compound_transform, vertex);

    final_vertex = Matrix.multiply([compound_transform, vertex]);

    return final_vertex;
}

// automatically called whenever user modifies a transform (changes type or values)
function ChangeTransform(index, type, values) {
    app.transforms[index].type = type;
    console.log(index, type, values); // display input for console

    // update `app.transforms[index].mat4x4`, checks the type and then adjusts based on matching transform.js functino
    if(type == "translate") {
        Mat4x4Translate(app.transforms[index].mat4x4, values[0], values[1], values[2]);
    } else if(type == "scale") {
        Mat4x4Scale(app.transforms[index].mat4x4, values[0], values[1], values[2]);
    } else if(type == "rotate_x") {
        Mat4x4RotateX(app.transforms[index].mat4x4, values[0]);
    } else if(type == "rotate_y") {
        Mat4x4RotateY(app.transforms[index].mat4x4, values[0]);
    } else if(type == "rotate_z") {
        Mat4x4RotateZ(app.transforms[index].mat4x4, values[0]);
    }

    // recalculate compound transform and tranformed vertex
    app.compound = CalculateCompoundTransform(app.transforms);
    app.final_vertex = CalculateTransformedVertex(app.vertex);
}
