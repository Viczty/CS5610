var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');

var pageModel = mongoose.model("Page", pageSchema);


pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;

module.exports = pageModel;


function createPage(websiteId, page) {
  page.websiteId = websiteId;
  return pageModel.create(page);
}

function findAllPagesForWebsite(websiteId) {
  return pageModel.find({websiteId: websiteId});
}

function findPageById(id) {
  return pageModel.findById(id);
}


function updatePage(pageId, page) {
  return pageModel.findByIdAndUpdate(pageId, page);
}

function deletePage(pageId) {
  return pageModel.findByIdAndRemove(pageId);
}
