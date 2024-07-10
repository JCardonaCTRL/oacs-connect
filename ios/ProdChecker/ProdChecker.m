//
//  ProdChecker.m
//  dgsomapp
//
//  Created by Nik Dennis on 11/18/20.
//  Copyright © 2020 650 Industries, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ProdChecker.h"

@implementation ProdChecker

RCT_EXPORT_MODULE();

RCT_REMAP_METHOD(isTestflight, resolver: (RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  NSURL *receiptURL = [[NSBundle mainBundle] appStoreReceiptURL];
  NSString *receiptURLString = [receiptURL path];
  BOOL isRunningTestFlightBeta =  ([receiptURLString rangeOfString:@"sandboxReceipt"].location != NSNotFound);
  if(isRunningTestFlightBeta) {
    NSString *thingToReturn = @"TESTFLIGHT";
    resolve(thingToReturn);
  } else {
    NSString *thingToReturn = @"PRODUCTION";
    resolve(thingToReturn);
  }
}

@end
