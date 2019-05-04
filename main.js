const STORE = {
  price: 0,
  tax: 0,
  tip: 0,
  earnings: 0,
  mealCounter: 0,
  tipTotal: []
};

function resetAll() {
  $('.jsResetButton').on( 'click', function (event) {
    event.preventDefault();
    
    STORE.price = 0;
    STORE.tax = 0;
    STORE.tip = 0;
    STORE.earnings = 0;
    STORE.mealCounter = 0;
    STORE.tipTotal = [];
    
    $('.jsmealEntryForm')[0].reset();

    $('.customerChargesSubtotal').html('');
    $('.customerChargesTip').html('');
    $('.customerChargesTotal').html('Enter a meal to see your charges.');

    $('.earningsInfoTipTotal').html('');
    $('.earningsMealCount').html('');
    $('.earningsAverageTip').html('Enter a meal to see your total earnings.');

  });
}

function cancelButton() {
  $('.jsMealEntry-cancel').on( 'click', function (event) {
    event.preventDefault();
    $('.jsmealEntryForm')[0].reset();
  });
}

function handlePrice(price) {
  STORE.price = price;
}

function handleTax(tax) {
  STORE.tax = tax;

  const taxInDollars = (( STORE.tax * 0.01 ) * ( STORE.price ));
  
  STORE.tax = taxInDollars;
}

function handleTip(tip) {
  const tipInDollars = (( tip * 0.01 ) * ( STORE.price ));
  STORE.tip = tipInDollars;
  STORE.tipTotal.push(STORE.tip);
}

function mealCalculator() {
  $('.jsmealEntryForm').on( 'submit', function (event) {
    event.preventDefault();

    const price = parseFloat($('.jsPrice').val()).toFixed(2);
    handlePrice(price);
    const tax = parseFloat($('.jsTax').val()).toFixed(2);
    handleTax(tax);
    const tip = parseFloat($('.jsTip').val()).toFixed(2);
    handleTip(tip);

    const mealTotal = ( STORE.price + STORE.tax + STORE.tip );
    parseFloat(mealTotal).toFixed(2);

    STORE.earnings += mealTotal;
    STORE.mealCounter++;

    earningsInfo();
    customerCharges();
  });
}

function customerCharges() {
  const subTotal = STORE.price + STORE.tax;
  const tipForPrint = STORE.tip;
  const totalCustomerCharge = subTotal + tipForPrint;
  $('.customerChargesSubtotal').html(`Subtotal: $${parseFloat(subTotal).toFixed(2)}`);
  $('.customerChargesTip').html(`Tip: $${parseFloat(tipForPrint).toFixed(2)}`);
  $('.customerChargesTotal').html(`Total: $${parseFloat(totalCustomerCharge).toFixed(2)}`);
}

function earningsInfo() {
  let tipSum = 0;
  for (let i = 0; i < STORE.tipTotal.length; i++) {
    tipSum += STORE.tipTotal[i];
  }
  let tipAvg = 0;
  tipAvg = tipSum / STORE.mealCounter;
  $('.earningsInfoTipTotal').html(`Tip Total: $${parseFloat(tipSum).toFixed(2)}`);
  $('.earningsMealCount').html(`Meal Count: ${STORE.mealCounter}`);
  $('.earningsAverageTip').html(`Average Tip: $${parseFloat(tipAvg).toFixed(2)}`);
}

function main() {
  cancelButton();
  mealCalculator();
  resetAll();
}

$(main);