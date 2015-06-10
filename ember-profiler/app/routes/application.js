import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {

    this.store.pushMany('question', questionImportData());
    this.store.pushMany('questionOption', answerOptionImportData());
  }
});

function questionImportData() {
  return [{"id":"1","index":"1","area":"Realistic","text":"Build kitchen cabinets"},{"id":"2","index":"2","area":"Realistic","text":"Lay brick or tile"},{"id":"3","index":"3","area":"Investigative","text":"Develop a new medicine"},{"id":"4","index":"4","area":"Investigative","text":"Study ways to reduce water pollution"},{"id":"5","index":"5","area":"Artistic","text":"Write books or plays"},{"id":"6","index":"6","area":"Artistic","text":"Play a musical instrument"},{"id":"7","index":"7","area":"Social","text":"Teach an individual an exercise routine"},{"id":"8","index":"8","area":"Social","text":"Help people with personal or emotional problems"},{"id":"9","index":"9","area":"Enterprising","text":"Buy and sell stocks and bonds"},{"id":"10","index":"10","area":"Enterprising","text":"Manage a retail store"},{"id":"11","index":"11","area":"Conventional","text":"Develop a spreadsheet using computer software"},{"id":"12","index":"12","area":"Conventional","text":"Proofread records or forms"},{"id":"13","index":"13","area":"Realistic","text":"Repair household appliances"},{"id":"14","index":"14","area":"Realistic","text":"Raise fish in a fish hatchery"},{"id":"15","index":"15","area":"Investigative","text":"Conduct chemical experiments"},{"id":"16","index":"16","area":"Investigative","text":"Study the movement of planets"},{"id":"17","index":"17","area":"Artistic","text":"Compose or arrange music"},{"id":"18","index":"18","area":"Artistic","text":"Draw pictures"},{"id":"19","index":"19","area":"Social","text":"Give career guidance to people"},{"id":"20","index":"20","area":"Social","text":"Perform rehabilitation therapy"},{"id":"21","index":"21","area":"Enterprising","text":"Operate a beauty salon or barber shop"},{"id":"22","index":"22","area":"Enterprising","text":"Manage a department within a large company"},{"id":"23","index":"23","area":"Conventional","text":"Load computer software into a large computer network"},{"id":"24","index":"24","area":"Conventional","text":"Operate a calculator"},{"id":"25","index":"25","area":"Realistic","text":"Assemble electronic parts"},{"id":"26","index":"26","area":"Realistic","text":"Drive a truck to deliver packages to offices and homes"},{"id":"27","index":"27","area":"Investigative","text":"Examine blood samples using a microscope"},{"id":"28","index":"28","area":"Investigative","text":"Investigate the cause of a fire"},{"id":"29","index":"29","area":"Artistic","text":"Create special effects for movies"},{"id":"30","index":"30","area":"Artistic","text":"Paint sets for plays"},{"id":"31","index":"31","area":"Social","text":"Do volunteer work at a non-profit organization"},{"id":"32","index":"32","area":"Social","text":"Teach children how to play sports"},{"id":"33","index":"33","area":"Enterprising","text":"Start your own business"},{"id":"34","index":"34","area":"Enterprising","text":"Negotiate business contracts"},{"id":"35","index":"35","area":"Conventional","text":"Keep shipping and receiving records"},{"id":"36","index":"36","area":"Conventional","text":"Calculate the wages of employees"},{"id":"37","index":"37","area":"Realistic","text":"Test the quality of parts before shipment"},{"id":"38","index":"38","area":"Realistic","text":"Repair and install locks"},{"id":"39","index":"39","area":"Investigative","text":"Develop a way to better predict the weather"},{"id":"40","index":"40","area":"Investigative","text":"Work in a biology lab"},{"id":"41","index":"41","area":"Artistic","text":"Write scripts for movies or television shows"},{"id":"42","index":"42","area":"Artistic","text":"Perform jazz or tap dance"},{"id":"43","index":"43","area":"Social","text":"Teach sign language to people with hearing disabilities"},{"id":"44","index":"44","area":"Social","text":"Help conduct a group therapy session"},{"id":"45","index":"45","area":"Enterprising","text":"Represent a client in a lawsuit"},{"id":"46","index":"46","area":"Enterprising","text":"Market a new line of clothing"},{"id":"47","index":"47","area":"Conventional","text":"Inventory supplies using a hand-held computer"},{"id":"48","index":"48","area":"Conventional","text":"Record rent payments"},{"id":"49","index":"49","area":"Realistic","text":"Set up and operate machines to make products"},{"id":"50","index":"50","area":"Realistic","text":"Put out forest fires"},{"id":"51","index":"51","area":"Investigative","text":"Invent a replacement for sugar"},{"id":"52","index":"52","area":"Investigative","text":"Do laboratory tests to identify diseases"},{"id":"53","index":"53","area":"Artistic","text":"Sing in a band"},{"id":"54","index":"54","area":"Artistic","text":"Edit movies"},{"id":"55","index":"55","area":"Social","text":"Take care of children at a day-care center"},{"id":"56","index":"56","area":"Social","text":"Teach a high-school class"},{"id":"57","index":"57","area":"Enterprising","text":"Sell merchandise at a department store"},{"id":"58","index":"58","area":"Enterprising","text":"Manage a clothing store"},{"id":"59","index":"59","area":"Conventional","text":"Keep inventory records"},{"id":"60","index":"60","area":"Conventional","text":"Stamp, sort, and distribute mail for an organization"}]
  ;
}

function answerOptionImportData() {
  return [{"id":"1","value":"1","label":"Strongly Dislike"},{"id":"2","value":"2","label":"Dislike"},{"id":"3","value":"3","label":"Unsure"},{"id":"4","value":"4","label":"Like"},{"id":"5","value":"5","label":"Strongly Like"}]
  ;
}
