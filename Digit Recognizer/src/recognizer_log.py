import pandas as pd
import numpy as np
from subprocess import check_output

train_df = pd.read_csv("../input/train.csv")
test_df = pd.read_csv("../input/test.csv")

x_train = np.array(train_df.iloc[:,1:].values)

y_train = np.array(train_df.iloc[:,0].values)

from sklearn.linear_model import LogisticRegression

model = LogisticRegression(C = 1e5)
model.fit(x_train, y_train)

ubmissions=pd.DataFrame({"ImageId": list(range(1,len(y_pre)+1)),
                         "Label": y_pre})
import time
time.sleep(10)
submissions.to_csv("/data/My Drive/data/input/mnist_tfkeras.csv", index=False, header=True)