import * as APIUtil from "../util/document_api_util"

export const RECEIVE_DOCUMENT = "RECEIVE_DOCUMENT";

const receiveDocument = document => ({
    type: RECEIVE_DOCUMENT,
    document
});

export const fetchDocument =  (roomId, problemId) => dispatch => (
    APIUtil.fetchDocument(roomId, problemId).then(document => dispatch(receiveDocument(document)))
);

export const createDocument = (roomId, problemId, documentData) => dispatch => (
    APIUtil.createDocument(roomId, problemId, documentData).then(document => dispatch(receiveDocument(document)))
);

export const updateDocument = (roomId, problemId, documentData) => dispatch => (
    APIUtil.updateDocument(roomId, problemId, documentData).then(document => dispatch(receiveDocument(document)))
);
