const by_type_subtype_id = function (doc) {
    emit([doc.type, doc.subtype, doc._id], doc);
}

module.exports = {
    product: {
        _id: '_design/product',
        language: 'javascript',
        views: {
            by_type_subtype_id: {
                map: by_type_subtype_id.toString()
            }
        }
    }
}