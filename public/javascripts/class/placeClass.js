function Place(config) {
  if(!config) {
    config = {};
  }
  this.name = config.name || undefined;
  this.address = config.address || undefined;
  this.website = config.website || undefined;
  this.checked = config.checked || false;
  this.method = config.method || undefined;
}
