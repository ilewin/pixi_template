export const SHAPES = {
    i: [[[0,1],[1,1],[2,1],[3,1]],
        [[1,0],[1,1],[1,2],[1,3]],
        [[0,2],[1,2],[2,2],[3,2]],
        [[2,0],[2,1],[2,2],[2,3]]],
    j: [[[0,1],[1,1],[2,1],[2,0]],
        [[0,0],[1,0],[1,1],[1,2]],
        [[0,2],[0,1],[1,1],[2,1]],
        [[1,0],[1,1],[1,2],[2,2]]],
    l: [[[0,1],[1,1],[2,1],[2,2]],
        [[2,0],[1,0],[1,1],[1,2]],
        [[0,0],[0,1],[1,1],[2,1]],
        [[1,0],[1,1],[1,2],[0,2]]],
    o: [[[0,0],[0,1],[1,0],[1,1]],
        [[0,0],[0,1],[1,0],[1,1]],
        [[0,0],[0,1],[1,0],[1,1]],
        [[0,0],[0,1],[1,0],[1,1]]],
    s: [[[2,0],[2,1],[1,1],[1,2]],
        [[0,0],[1,0],[1,1],[2,1]],
        [[1,0],[1,1],[0,1],[0,2]],
        [[0,1],[1,1],[1,2],[2,2]]],
    t: [[[1,0],[1,1],[1,2],[2,1]],
        [[0,1],[1,1],[2,1],[1,0]],
        [[0,1],[1,1],[1,0],[1,2]],
        [[0,1],[1,1],[2,1],[1,2]]],
    z: [[[1,0],[1,1],[2,1],[2,2]],
        [[0,1],[1,1],[1,0],[2,0]],
        [[0,0],[0,1],[1,1],[1,2]],
        [[0,2],[1,2],[1,1],[2,1]]]
};

export const SHAPE_TEXTURE_IDS = {j: 1, s: 2, t: 3, o: 4, i: 5, l: 6, z: 7};

export type TextureKeys = keyof typeof SHAPES;
//export type Values = typeof SHAPE_TEXTURE_IDS[Keys];/