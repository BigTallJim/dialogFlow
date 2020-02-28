describe('Testing api call', function(){
  it("It returns response", async function(){
    const result = await dialogFlowApiCall("order pizza with cheese at 19:00 today size XL");
    expect(result).toEqual("not this");
  });
});